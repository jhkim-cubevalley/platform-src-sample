import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { nanoid } from 'nanoid';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';
import { CubeezDocument } from '../domain/cubeez-document.entity';
import { AddCubeezDocumentCommand } from '../commands/add-cubeez-document.command';
import { UpdateCubeezCommand } from '../commands/update-cubeez.command';

@Injectable()
@CommandHandler(AddCubeezDocumentCommand)
export class AddCubeezDocumentHandler implements ICommandHandler<AddCubeezDocumentCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly commandBus: CommandBus,
    @InjectRepository(CubeezDocument) private readonly cubeezDocumentRepository: Repository<CubeezDocument>,
    @InjectAwsService(S3) private readonly s3: S3
  ) {}

  async execute(command: AddCubeezDocumentCommand): Promise<string | CubeezDocument> {
    const { cubeez, type, file } = command.data;
    const url = nanoid() + extname(file.originalname);

    if (type === 'profile') {
      const fullUrl = this.config.get('AWS_IMAGE_CLOUDFRONT') + url;
      await this.s3
        .putObject({
          Bucket: this.config.get('AWS_IMAGE_BUCKET'),
          Body: file.buffer,
          Key: url
        })
        .promise();
      await this.commandBus.execute(
        new UpdateCubeezCommand(
          cubeez.uid,
          {
            profileUrl: fullUrl
          },
          command.transaction
        )
      );
      return fullUrl;
    }

    await this.s3
      .putObject({
        Bucket: this.config.get('AWS_CUBEEZ_BUCKET'),
        Body: file.buffer,
        Key: url,
        ServerSideEncryption: 'AES256'
      })
      .promise();
    Logger.log({ message: `큐비즈 서류 이미지를 저장했습니다.`, uid: cubeez.uid, type });
    const result = this.cubeezDocumentRepository.create({
      cubeez,
      documentType: type,
      imageUrl: url
    });
    return this.cubeezDocumentRepository.save(result);
  }
}

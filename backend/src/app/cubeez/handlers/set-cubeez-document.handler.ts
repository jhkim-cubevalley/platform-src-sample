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
import { UpdateCubeezCommand } from '../commands/update-cubeez.command';
import { SetCubeezDocumentCommand } from '../commands/set-cubeez-document.command';

@Injectable()
@CommandHandler(SetCubeezDocumentCommand)
export class SetCubeezDocumentHandler implements ICommandHandler<SetCubeezDocumentCommand> {
  constructor(
    private readonly config: ConfigService,
    private readonly commandBus: CommandBus,
    @InjectRepository(CubeezDocument) private readonly cubeezDocumentRepository: Repository<CubeezDocument>,
    @InjectAwsService(S3) private readonly s3: S3
  ) {}

  async execute({ data: { cubeez, type, file } }: SetCubeezDocumentCommand): Promise<string | CubeezDocument> {
    const url = nanoid() + extname(file.originalname);

    if (type === 'profile') {
      const profileKey = cubeez.profileUrl.split('/').pop();
      await this.s3.deleteObject({
        Bucket: this.config.get('AWS_IMAGE_BUCKET'),
        Key: profileKey
      });

      const fullUrl = this.config.get('AWS_IMAGE_CLOUDFRONT') + url;
      await this.s3
        .putObject({
          Bucket: this.config.get('AWS_IMAGE_BUCKET'),
          Body: file.buffer,
          Key: url
        })
        .promise();
      await this.commandBus.execute(
        new UpdateCubeezCommand(cubeez.uid, {
          profileUrl: fullUrl
        })
      );
      return fullUrl;
    }

    const cubeezDocument = await this.cubeezDocumentRepository.find({
      select: {
        id: true,
        documentType: true,
        imageUrl: true
      },
      relations: {
        cubeez: true
      },
      where: {
        cubeez: { uid: cubeez.uid }
      }
    });
    if (cubeezDocument?.length > 0) {
      await this.cubeezDocumentRepository.delete({
        cubeez: { uid: cubeez.uid },
        documentType: type
      });
      await Promise.all(
        cubeezDocument
          .filter(({ documentType }) => documentType === type)
          .map(async ({ imageUrl }) => {
            await this.s3.deleteObject({
              Bucket: this.config.get('AWS_CUBEEZ_BUCKET'),
              Key: imageUrl
            });
          })
      );
    }

    await this.s3
      .putObject({
        Bucket: this.config.get('AWS_CUBEEZ_BUCKET'),
        Body: file.buffer,
        Key: url,
        ServerSideEncryption: 'AES256'
      })
      .promise();
    const result = this.cubeezDocumentRepository.create({
      cubeez: { uid: cubeez.uid },
      documentType: type,
      imageUrl: url
    });
    await this.cubeezDocumentRepository.save(result);
    Logger.log({ message: `큐비즈 서류 이미지를 변경했습니다.`, uid: cubeez.uid, type });
    return result;
  }
}

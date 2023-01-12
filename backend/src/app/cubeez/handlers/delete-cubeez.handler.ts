import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { InjectRepository } from '@nestjs/typeorm';
import { Error } from '../../../infrastructure/common/error';
import { AccountSns } from '../../account/domain/account-sns.entity';
import { DeleteCubeezCommand } from '../commands/delete-cubeez.command';
import { GetCubeezQuery } from '../queries/get-cubeez.query';
import { Cubeez } from '../domain/cubeez.entity';
import { CubeezDocument } from '../domain/cubeez-document.entity';
import { CubeezPhone } from '../domain/cubeez-phone.entity';

@Injectable()
@CommandHandler(DeleteCubeezCommand)
export class DeleteCubeezHandler implements ICommandHandler<DeleteCubeezCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly connection: Connection,
    private readonly config: ConfigService,
    @InjectAwsService(S3) private readonly s3: S3,
    @InjectRepository(CubeezDocument) private readonly cubeezDocumentRepository: Repository<CubeezDocument>
  ) {}

  async execute({ uid }: DeleteCubeezCommand): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cubeez = await this.queryBus.execute<unknown, Cubeez>(new GetCubeezQuery(uid));
      if (!cubeez) throw new NotFoundException(Error.NOT_FOUND_CUBEEZ);

      const documents = await this.cubeezDocumentRepository.find({
        where: { cubeez: { uid } },
        select: {
          imageUrl: true
        }
      });

      if (cubeez.profileUrl) {
        await this.s3.deleteObject({
          Bucket: this.config.get('AWS_IMAGE_BUCKET'),
          Key: cubeez.profileUrl.split('/').pop()
        });
      }

      await Promise.all(
        documents.map(async ({ imageUrl }) => {
          await this.s3.deleteObject({
            Bucket: this.config.get('AWS_CUBEEZ_BUCKET'),
            Key: imageUrl
          });
        })
      );

      await queryRunner.manager.delete(AccountSns, { cubeez: { uid } });
      await queryRunner.manager.delete(CubeezDocument, { cubeez: { uid } });
      await queryRunner.manager.delete(CubeezPhone, { cubeez: { uid } });
      await queryRunner.manager.softDelete(Cubeez, { uid });
      await queryRunner.manager.update(Cubeez, { uid }, { name: '탈퇴한 큐비즈' });
      await queryRunner.commitTransaction();

      return true;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}

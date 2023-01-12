import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { NotFoundException } from '@nestjs/common';
import { CubeezDocument } from '../domain/cubeez-document.entity';
import { GetCubeezDocumentQuery } from '../queries/get-cubeez-document.query';
import { Error } from '../../../infrastructure/common/error';
import { GetCubeezQuery } from '../queries/get-cubeez.query';

@QueryHandler(GetCubeezDocumentQuery)
export class GetCubeezDocumentHandler implements IQueryHandler<GetCubeezDocumentQuery> {
  constructor(
    private readonly config: ConfigService,
    private readonly queryBus: QueryBus,
    @InjectRepository(CubeezDocument) private readonly cubeezDocumentRepository: Repository<CubeezDocument>,
    @InjectAwsService(S3) private readonly s3: S3
  ) {}

  async execute({ uid, type }: GetCubeezDocumentQuery): Promise<Buffer> {
    const cubeez = await this.queryBus.execute(new GetCubeezQuery(uid));
    const cubeezDocument = await this.cubeezDocumentRepository.findOne({
      relations: {
        cubeez: true
      },
      select: {
        id: true,
        documentType: true,
        imageUrl: true,
        cubeez: {
          uid: true
        }
      },
      where: {
        cubeez: {
          uid
        },
        documentType: type
      }
    });
    if (!cubeez) throw new NotFoundException(Error.NOT_FOUND_CUBEEZ);
    if (!cubeezDocument) throw new NotFoundException(Error.NOT_FOUND_DOCUMENT);
    const result = await this.s3
      .getObject({
        Bucket: this.config.get('AWS_CUBEEZ_BUCKET'),
        Key: cubeezDocument.imageUrl
      })
      .promise();
    return result.Body as Buffer;
  }
}

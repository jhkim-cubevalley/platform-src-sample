import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ContentImage } from './domain/content-image.entity';
import { UploadBoardImageHandler } from './handlers/upload-board-image.handler';
import { UploadController } from './upload.controller';

const handlers = [UploadBoardImageHandler];

@Module({
  imports: [TypeOrmModule.forFeature([ContentImage]), CqrsModule],
  providers: [...handlers],
  controllers: [UploadController]
})
export class UploadModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Library } from './domain/library.entity';
import { LibraryDetail } from './domain/library-detail.entity';
import { LibraryImage } from './domain/library-image.entity';
import { CreateLibraryHandler } from './handlers/create-library.handler';
import { GetAllLibraryHandler } from './handlers/get-all-library.handler';
import { LibraryController } from './library.controller';
import { GetLibraryHandler } from './handlers/get-library.handler';
import { DeleteLibraryHandler } from './handlers/delete-library.handler';
import { AddLibraryImageHandler } from './handlers/add-library-image.handler';
import { UpdateLibraryHandler } from './handlers/update-library.handler';
import { DeleteLibraryImageHandler } from './handlers/delete-library-image.handler';

const commandHandlers = [
  CreateLibraryHandler,
  UpdateLibraryHandler,
  DeleteLibraryHandler,
  AddLibraryImageHandler,
  DeleteLibraryImageHandler
];
const queryHandlers = [GetAllLibraryHandler, GetLibraryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Library, LibraryDetail, LibraryImage]), CqrsModule],
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [LibraryController]
})
export class LibraryModule {}

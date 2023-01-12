import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Cubeez } from './domain/cubeez.entity';
import { CubeezDocument } from './domain/cubeez-document.entity';
import { CubeezPhone } from './domain/cubeez-phone.entity';
import { GetCubeezByEmailHandler } from './handlers/get-cubeez-by-email.handler';
import { GetCubeezByNicknameHandler } from './handlers/get-cubeez-by-nickname.handler';
import { GetCubeezByPhoneHandler } from './handlers/get-cubeez-by-phone.handler';
import { AddCubeezPhoneHandler } from './handlers/add-cubeez-phone.handler';
import { CreateCubeezHandler } from './handlers/create-cubeez.handler';
import { AddCubeezDocumentHandler } from './handlers/add-cubeez-document.handler';
import { UpdateCubeezHandler } from './handlers/update-cubeez.handler';
import { GetCubeezHandler } from './handlers/get-cubeez.handler';
import { SetCubeezPhoneHandler } from './handlers/set-cubeez-phone.handler';
import { GetCubeezDocumentHandler } from './handlers/get-cubeez-document.handler';
import { GetAllCubeezHandler } from './handlers/get-all-cubeez.handler';
import { DeleteCubeezHandler } from './handlers/delete-cubeez.handler';
import { CubeezController } from './cubeez.controller';
import { SetCubeezDocumentHandler } from './handlers/set-cubeez-document.handler';

const commandHandlers = [
  CreateCubeezHandler,
  AddCubeezPhoneHandler,
  AddCubeezDocumentHandler,
  UpdateCubeezHandler,
  SetCubeezPhoneHandler,
  DeleteCubeezHandler,
  SetCubeezDocumentHandler
];
const queryHandlers = [
  GetCubeezByEmailHandler,
  GetCubeezByNicknameHandler,
  GetCubeezByPhoneHandler,
  GetCubeezHandler,
  GetCubeezDocumentHandler,
  GetAllCubeezHandler
];

@Module({
  imports: [TypeOrmModule.forFeature([Cubeez, CubeezDocument, CubeezPhone]), CqrsModule],
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [CubeezController]
})
export class CubeezModule {}

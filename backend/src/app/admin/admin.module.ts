import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Admin } from './domain/admin.entity';
import { ApproveCubeezHandler } from './handlers/approve-cubeez.handler';
import { DenyCubeezHandler } from './handlers/deny-cubeez.handler';
import { AdminController } from './controllers/admin.controller';
import { Department } from './domain/department.entity';
import { Team } from './domain/team.entity';
import { JobPosition } from './domain/job-position.entity';
import { CreateAdminHandler } from './handlers/create-admin.handler';
import { UpdateAdminHandler } from './handlers/update-admin.handler';
import { DeleteAdminHandler } from './handlers/delete-admin.handler';
import { GetAdminByEmailHandler } from './handlers/get-admin-by-email.handler';
import { GetAllAdminHandler } from './handlers/get-all-admin.handler';
import { CreateDepartmentHandler } from './handlers/department/create-department.handler';
import { UpdateDepartmentHandler } from './handlers/department/update-department.handler';
import { DeleteDepartmentHandler } from './handlers/department/delete-department.handler';
import { GetDepartmentByNameHandler } from './handlers/department/get-department-by-name.handler';
import { AdminDepartmentController } from './controllers/admin-department.controller';
import { CreateJobPositionHandler } from './handlers/jobPosition/create-job-position.handler';
import { UpdateJobPositionHandler } from './handlers/jobPosition/update-job-position.handler';
import { DeleteJobPositionHandler } from './handlers/jobPosition/delete-job-position.handler';
import { GetJobPositionByNameHandler } from './handlers/jobPosition/get-job-position-by-name.handler';
import { AdminJobPositionController } from './controllers/admin-job-position.controller';
import { GetDepartmentHandler } from './handlers/department/get-department.handler';
import { AdminTeamController } from './controllers/admin-team.controller';
import { CreateTeamHandler } from './handlers/team/create-team.handler';
import { UpdateTeamHandler } from './handlers/team/update-team.handler';
import { DeleteTeamHandler } from './handlers/team/delete-team.handler';
import { GetTeamByNameHandler } from './handlers/team/get-team-by-name.handler';
import { GetAdminByRuleHandler } from './handlers/get-admin-by-rule.handler';
import { GetAdminHandler } from './handlers/get-admin.handler';
import { AdminAccountController } from './controllers/admin-account.controller';
import { GetAllDepartmentHandler } from './handlers/department/get-all-department.handler';
import { GetJobPositionHandler } from './handlers/jobPosition/get-job-position.handler';
import { GetAllJobPositionHandler } from './handlers/jobPosition/get-all-job-position.handler';
import { GetTeamHandler } from './handlers/team/get-team.handler';
import { GetAllTeamHandler } from './handlers/team/get-all-team.handler';

const commandHandlers = [
  ApproveCubeezHandler,
  DenyCubeezHandler,
  CreateAdminHandler,
  UpdateAdminHandler,
  DeleteAdminHandler,
  CreateDepartmentHandler,
  UpdateDepartmentHandler,
  DeleteDepartmentHandler,
  CreateJobPositionHandler,
  UpdateJobPositionHandler,
  DeleteJobPositionHandler,
  CreateTeamHandler,
  UpdateTeamHandler,
  DeleteTeamHandler
];
const queryHandlers = [
  GetAdminByEmailHandler,
  GetAllAdminHandler,
  GetDepartmentByNameHandler,
  GetDepartmentHandler,
  GetJobPositionByNameHandler,
  GetTeamByNameHandler,
  GetAdminByRuleHandler,
  GetAdminHandler,
  GetAllDepartmentHandler,
  GetJobPositionHandler,
  GetAllJobPositionHandler,
  GetTeamHandler,
  GetAllTeamHandler
];

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Department, Team, JobPosition]), CqrsModule],
  providers: [...commandHandlers, ...queryHandlers],
  controllers: [
    AdminController,
    AdminDepartmentController,
    AdminJobPositionController,
    AdminTeamController,
    AdminAccountController
  ]
})
export class AdminModule {}

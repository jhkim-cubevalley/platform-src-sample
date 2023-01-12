import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { RegisterUserHandler } from './handlers/user/register-user.handler';
import { UserAuthController } from './controllers/user-auth.controller';
import { SendPhoneCodeHandler } from './handlers/send-phone-code.handler';
import { VerifyController } from './controllers/verify.controller';
import { SendEmailCodeHandler } from './handlers/send-email-code.handler';
import { ValidateUserHandler } from './handlers/validate-user.handler';
import { GenerateTokenHandler } from './handlers/generate-token.handler';
import { NaverStrategy } from './strategies/naver.strategy';
import { SaveMoreProfileHandler } from './handlers/user/save-more-profile.handler';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { FindUserIdHandler } from './handlers/user/find-user-id.handler';
import { ForgotUserPasswordHandler } from './handlers/user/forgot-user-password.handler';
import { ResetUserPasswordHandler } from './handlers/user/reset-user-password.handler';
import { CubeezAuthController } from './controllers/cubeez-auth.controller';
import { RegisterCubeezHandler } from './handlers/cubeez/register-cubeez.handler';
import { FindCubeezIdHandler } from './handlers/cubeez/find-cubeez-id.handler';
import { ResetCubeezPasswordHandler } from './handlers/cubeez/reset-cubeez-password.handler';
import { ForgotCubeezPasswordHandler } from './handlers/cubeez/forgot-cubeez-password.handler';
import { DecodeTokenHandler } from './handlers/decode-token.handler';
import { ForgotAdminPasswordHandler } from './handlers/admin/forgot-admin-password.handler';
import { ResetAdminPasswordHandler } from './handlers/admin/reset-admin-password.handler';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AuthController } from './controllers/auth.controller';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { AppleStrategy } from './strategies/apple.strategy';

const commandHandlers = [
  RegisterUserHandler,
  SendPhoneCodeHandler,
  SendEmailCodeHandler,
  ValidateUserHandler,
  GenerateTokenHandler,
  SaveMoreProfileHandler,
  FindUserIdHandler,
  ForgotUserPasswordHandler,
  ResetUserPasswordHandler,
  RegisterCubeezHandler,
  FindCubeezIdHandler,
  ForgotCubeezPasswordHandler,
  ResetCubeezPasswordHandler,
  DecodeTokenHandler,
  ForgotAdminPasswordHandler,
  ResetAdminPasswordHandler
];
const strategies = [NaverStrategy, KakaoStrategy, FacebookStrategy, AppleStrategy];

@Module({
  imports: [CqrsModule, JwtModule.register({})],
  controllers: [AuthController, UserAuthController, CubeezAuthController, AdminAuthController, VerifyController],
  providers: [...commandHandlers, ...strategies]
})
export class AuthModule {}

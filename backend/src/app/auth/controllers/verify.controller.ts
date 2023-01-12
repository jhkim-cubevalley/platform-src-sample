import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyPhoneDto } from '../domain/verify-phone.dto';
import { SendPhoneCodeCommand } from '../commands/send-phone-code.command';
import { SendEmailCodeCommand } from '../commands/send-email-code.command';
import { VerifyEmailDto } from '../domain/verify-email.dto';

@ApiTags('auth - 공통 로그인 API')
@Controller('auth/verify')
export class VerifyController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({
    description: '회원가입 전 API를 호출하여 인증코드를 전송합니다.'
  })
  @Post('/email')
  async verifyEmail(@Body() body: VerifyEmailDto): Promise<void> {
    return this.commandBus.execute(new SendEmailCodeCommand(body.email));
  }

  @ApiOperation({
    description: '회원가입 전 API를 호출하여 인증코드를 전송합니다.'
  })
  @Post('/phone')
  async verifyPhone(@Body() body: VerifyPhoneDto): Promise<void> {
    return this.commandBus.execute(new SendPhoneCodeCommand(body.phone));
  }
}

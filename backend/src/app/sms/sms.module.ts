import { Module } from '@nestjs/common';
import { SendSmsHandler } from './send-sms.handler';

@Module({
  providers: [SendSmsHandler]
})
export class SmsModule {}

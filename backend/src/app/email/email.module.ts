import { Module } from '@nestjs/common';
import { SendEmailHandler } from './send-email.handler';

@Module({
  providers: [SendEmailHandler]
})
export class EmailModule {}

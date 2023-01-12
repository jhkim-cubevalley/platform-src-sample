import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), CqrsModule],
  providers: [CronService]
})
export class CronModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationGateway } from './notification.gateway';
import { SocketService } from './socket.service';
import { SendNotificationHandler } from './handlers/send-notification.handler';

const commandHandlers = [SendNotificationHandler];

@Module({
  imports: [CqrsModule],
  providers: [SocketService, NotificationGateway, ...commandHandlers]
})
export class NotificationModule {}

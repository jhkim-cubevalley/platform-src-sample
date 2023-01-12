import { Injectable } from '@nestjs/common';
import type { Server } from 'socket.io';

@Injectable()
export class SocketService {
  public socket: Server = null;
}

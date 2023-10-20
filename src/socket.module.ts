import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { MessageService } from './services/message.service';

@Module({
  providers: [SocketGateway, MessageService],
})
export class SocketModule {}

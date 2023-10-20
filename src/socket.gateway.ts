import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from './services/message.service';

@WebSocketGateway()
export class SocketGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chatMessage')
  async handleChatMessage(client: any, message: string): Promise<void> {
    this.messageService.addMessage(message);

    this.server.emit('chatMessage', message);
  }
}

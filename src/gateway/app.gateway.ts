import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('Gateway App');
  @WebSocketServer()
  server: Server;
  clientNumber = 0;

  afterInit(server: Server) {
    this.logger.log('Gateway initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected', client.id);
    // A new client disconnected from the gateway
    this.clientNumber--;

    // notify connected clients of number current clients
    this.server.emit('clients', this.clientNumber);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected', client.id);
    // A new client connected to the gateway
    this.clientNumber++;

    // notify connected clients of number current clients
    this.server.emit('clients', this.clientNumber);
  }

  @SubscribeMessage('todos')
  handleMessage(client: Socket, payload: any) {
    console.log(payload);
    this.logger.log(payload);
    client.broadcast.emit('todos', payload);
  }
}

import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Prisma, User } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { parse } from 'cookie';

@WebSocketGateway({
  namespace: 'chat',
  serveClient: false,
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly sessions = new Map();

  constructor(
    private readonly chatService: ChatService,
    private JwtService: JwtService,
    private UsersService: UsersService,
  ) {}

  verifyConnection(client: any) {
    if (!client.handshake.headers.cookie) return client.disconnect();
    //ssssassss
    const token = parse(client.handshake.headers.cookie)['access-token'];
    const payload = this.JwtService.verify(token);

    if (payload) return payload;
  }

  async handleConnection(@ConnectedSocket() client) {
    const payload = this.verifyConnection(client);
    const user = this.UsersService.findByEmail(payload.email);
    const account = await this.chatService.getAccount(payload.id);
    this.sessions.set(account.id, account.name);
    console.log(`connected ${payload.email}`);

    !user && client.disconnect();
  }

  async handleDisconnect(@ConnectedSocket() client) {
    const payload = this.verifyConnection(client);
    const account = await this.chatService.getAccount(payload.id);
    this.sessions.delete(account.id);
    console.log(`disconnected ${payload.email}`);
  }

  @SubscribeMessage('getMessages')
  async handleMessagesGet() {
    const messages = await this.chatService.getMessages();
    this.server.emit('getMessages', messages);
  }

  @SubscribeMessage('sendMessage')
  async handleMessageSend(
    @MessageBody() payload: Prisma.MessageCreateInput,
  ): Promise<any> {
    await this.chatService.createMessage(payload);
    this.handleMessagesGet();
  }

  @SubscribeMessage('deleteMessage')
  async handleMessageDelete(
    @MessageBody()
    payload,
  ) {
    await this.chatService.removeMessage(payload);
    this.handleMessagesGet();
  }

  @SubscribeMessage('updateMessage')
  async handleMessagePut(
    @MessageBody()
    payload,
  ): Promise<void> {
    const updatedMessage = await this.chatService.updateMessage(payload);
    this.server.emit('updateMessage', updatedMessage);
    this.handleMessagesGet();
  }

  @SubscribeMessage('typing')
  async typing(@MessageBody() isTyping, @ConnectedSocket() client: Socket) {
    const payload = this.verifyConnection(client);
    const account = await this.chatService.getAccount(payload.id);
    this.server.emit('typing', { name: account.name, isTyping });
  }

  @SubscribeMessage('getOnlineGroupUsers')
  async handleGetOnlineGroupUsers(@ConnectedSocket() client) {
    const payload = this.verifyConnection(client);
    const account = await this.chatService.getAccount(payload.id);

    const onlineUsers = [];
    const offlineUsers = [];

    const allUsers = await this.chatService.getUsers();

    allUsers.forEach((user) => {
      const socket = this.sessions.get(account.id);
      socket === user.name ? onlineUsers.push(user) : offlineUsers.push(user);
    });
    console.log('online', onlineUsers);
    console.log('offline', offlineUsers);

    this.server.emit('onlineGroupUsersReceived', { onlineUsers, offlineUsers });
  }
}

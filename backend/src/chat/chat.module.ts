import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { DbModule } from 'src/db/db.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DbModule, UsersModule],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}

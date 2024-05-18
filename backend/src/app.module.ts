import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountModule } from './account/account.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [DbModule, AuthModule, UsersModule, AccountModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

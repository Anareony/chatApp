import { BadRequestException, Injectable } from '@nestjs/common';
import { Message, Prisma, PrismaClient } from '@prisma/client';
import { Socket } from 'socket.io';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ChatService {
  constructor(private readonly db: DbService) {}

  async getMessages(): Promise<Message[]> {
    return this.db.message.findMany({
      include: {
        account: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async createMessage(data: Prisma.MessageCreateInput) {
    return this.db.message.create({ data });
  }

  async updateMessage(payload) {
    const { id, content } = payload;
    return this.db.message.update({ where: { id }, data: { content } });
  }

  async removeMessage(where: Prisma.MessageWhereUniqueInput) {
    return this.db.message.delete({ where });
  }

  async getUsers() {
    return this.db.account.findMany();
  }
  async getAccount(userId: number) {
    return this.db.account.findUniqueOrThrow({ where: { ownerId: userId } });
  }
}

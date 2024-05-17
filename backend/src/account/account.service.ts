import { Injectable } from '@nestjs/common';
import { PatchAccountDto } from './dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AccountService {
  constructor(private db: DbService) {}

  async create(userId: number) {
    return this.db.account.create({
      data: {
        ownerId: userId,
        avatarUrl: '',
        name: '',
        surname: '',
      },
    });
  }

  async createGoogle(userId: number, name: string, surname: string) {
    return this.db.account.create({
      data: {
        ownerId: userId,
        avatarUrl: '',
        name: name,
        surname: surname,
      },
    });
  }

  async getAccount(userId: number) {
    return this.db.account.findUniqueOrThrow({ where: { ownerId: userId } });
  }

  async patchAccount(userId: number, patch: PatchAccountDto) {
    return this.db.account.update({
      where: { ownerId: userId },
      data: { ...patch },
    });
  }
}

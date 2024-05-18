import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(
    private db: DbService,
    private AccountService: AccountService,
  ) {}

  async findByEmail(email: string) {
    return await this.db.user.findFirst({ where: { email } });
  }

  async create(email: string, hash: string, salt: string) {
    const user = await this.db.user.create({ data: { email, hash, salt } });
    await this.AccountService.create(user.id);

    return user;
  }

  async createGoogle(
    email: string,
    hash: string,
    salt: string,
    name: string,
    surname: string,
  ) {
    const user = await this.db.user.create({ data: { email } });
    console.log(user);
    await this.AccountService.createGoogle(user.id, name, surname);

    return user;
  }
}

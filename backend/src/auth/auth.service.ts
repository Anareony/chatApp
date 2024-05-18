import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private PasswordService: PasswordService,
    private JwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    const user = await this.UsersService.findByEmail(email.toLowerCase());

    if (user) {
      throw new BadRequestException({ type: 'email-exist' });
    }

    const salt = this.PasswordService.getSalt();
    const hash = this.PasswordService.getHash(password, salt);

    const newUser = await this.UsersService.create(
      email.toLowerCase(),
      hash,
      salt,
    );

    const accessToken = await this.JwtService.signAsync({
      id: newUser.id,
      email: newUser.email,
    });

    return { accessToken };
  }

  async signIn(email: string, password: string) {
    const user = await this.UsersService.findByEmail(email.toLowerCase());

    if (!user) {
      throw new UnauthorizedException();
    }

    const hash = this.PasswordService.getHash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.JwtService.signAsync({
      id: user.id,
      email: user.email.toLowerCase(),
    });

    return { accessToken };
  }

  async googleLogin(req) {
    const existedUser = await this.UsersService.findByEmail(
      req.email.toLowerCase(),
    );

    if (!existedUser) {
      const newUser = await this.UsersService.createGoogle(
        req.email,
        null,
        null,
        req.firstName,
        req.lastName,
      );
      const accessToken = await this.JwtService.signAsync({
        id: newUser.id,
        email: newUser.email,
      });

      return { accessToken };
    }

    const accessToken = await this.JwtService.signAsync({
      id: existedUser.id,
      email: existedUser.email,
    });

    return { accessToken };
  }
}

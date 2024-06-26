import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { CookieService } from '../cookie.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies[CookieService.tokenKey];
    console.log(token);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const sessingInfo = this.JwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      req['session'] = sessingInfo;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

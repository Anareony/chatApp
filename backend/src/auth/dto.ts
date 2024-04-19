import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpBodyDto {
  @ApiProperty({ example: 'dada@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '13123' })
  @IsNotEmpty()
  password: string;
}

export class SignInBodyDto {
  @ApiProperty({ example: 'dada@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '13123' })
  @IsNotEmpty()
  password: string;
}

export class getSessionInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;
}

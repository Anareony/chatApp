import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AccountDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty()
  @IsOptional()
  avatarUrl: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;
}

export class PatchAccountDto {
  @ApiProperty()
  @IsOptional()
  avatarUrl?: string;

  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @ApiProperty()
  surname?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly userId: string;

  @IsString()
  @ApiProperty()
  readonly password: string;
}

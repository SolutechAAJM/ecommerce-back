import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1) 
  fullname: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  createdAt: Date;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  phone: string

  @IsString()
  address: string
}

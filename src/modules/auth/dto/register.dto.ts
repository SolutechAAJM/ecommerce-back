import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsNumber, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1) 
  fullName: string;

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

  @IsNumber()
  creditPoints: number

  @IsString()
  role: string
}

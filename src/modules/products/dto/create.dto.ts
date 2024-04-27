import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsDateString } from 'class-validator';

export class createProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsString()
  characteristics: string;

  @IsNotEmpty()
  @IsBoolean()
  isOffer: boolean;

  @IsNotEmpty()
  @IsDateString()
  dateCreation: string;

  @IsDateString()
  lastModify: string;

  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

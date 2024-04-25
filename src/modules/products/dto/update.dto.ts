import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsDateString } from 'class-validator';

export class updateProductDTO {

  @IsNotEmpty()
  @IsNumber()
  id:number

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
  idType: number;

  @IsNotEmpty()
  @IsNumber()
  idCategory: number;

  @IsNotEmpty()
  @IsNumber()
  idLastModifier: number;
}

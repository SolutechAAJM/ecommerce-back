import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { SearchType } from "../enum/search.enum";

export class SearchDTO {
    @IsString()
    typeSearch: SearchType;

    @IsOptional()
    @IsString()
    textSearch?: string;

    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsNumber()
    idType?: number;

    @Transform(({ value }) => parseInt(value)) 
    @IsOptional()
    @IsNumber()
    idCategory?: number;

    @Transform(({ value }) => parseFloat(value))
    @IsOptional()
    @IsNumber()
    @Min(0)
    minPrice?: number;

    @Transform(({ value }) => parseFloat(value)) 
    @IsOptional()
    @IsNumber()
    @Min(0)
    maxPrice?: number;
}

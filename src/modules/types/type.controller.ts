
import { Controller, Get, Post,  HttpException , Body, Param, HttpStatus, Res} from '@nestjs/common';
import { Response } from 'express';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create.dto';
import { UpdateTypeDto } from './dto/update.dto';
import { EcommerceController } from '../admin/ecommerce.controller';

import { messages } from 'src/messages/messages';

@Controller('types')
export class TypeController extends EcommerceController
{
  constructor(private readonly typeService: TypeService) {
    super();
  }


  @Get()
  async findAll(@Res() res: Response) {
    try {
      const response = await this.typeService.findAll();
      return this.successResponse(res, messages.success, response);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const response = await this.typeService.findOne(+id);
      return this.successResponse(res, messages.success, response);
    } catch (error) {
      throw new HttpException(error.message || messages.typeNotFound, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  async create
  (
    @Body() createTypeDto: CreateTypeDto,
    @Res() res: Response
  ) 
  {
    try {
      const response = await this.typeService.create(createTypeDto);
      return this.createdResponse(res, messages.typeCreated, response);
    } catch (error) {
      throw new HttpException(error.message || messages.createTypeError, HttpStatus.NOT_FOUND);
    }
  }

  @Post('update')
  async update
  (
    @Body() updateTypeDto: UpdateTypeDto,
    @Res() res: Response
  ) 
  {
    try {
      const response = await this.typeService.update(updateTypeDto);
      return this.createdResponse(res, messages.typeUpdated, response);
    } catch (error) {
      throw new HttpException(error.message || messages.typeNotFound, HttpStatus.NOT_FOUND);
    }
  }

   
  @Post(':id/delete')
  async remove(@Param('id') id: number, @Res() res: Response ) {
    try {
      const response = await this.typeService.remove(+id);
      return this.successResponse(res, messages.deletedType, response);
    } catch (error) {
      throw new HttpException(error.message || messages.typeNotFound, HttpStatus.NOT_FOUND);
    }
  }
}

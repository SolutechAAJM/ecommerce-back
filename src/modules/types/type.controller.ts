
import { Controller, Get, Post,  HttpException , Body, Param, HttpStatus, Res} from '@nestjs/common';
import { Response } from 'express';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create.dto';
import { UpdateTypeDto } from './dto/update.dto';
import { getMessages } from 'src/messages/messages';
import { EcommerceController } from '../admin/ecommerce.controller';

@Controller('types')
export class TypeController extends EcommerceController
{
  constructor(private readonly typeService: TypeService) {
    super();
  }

  private messages = getMessages();

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const response = await this.typeService.findAll();
      return this.successResponse(res, this.messages.success, response);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const response = await this.typeService.findOne(+id);
      return this.successResponse(res, this.messages.success, response);
    } catch (error) {
      throw new HttpException(error.message || this.messages.typeNotFound, HttpStatus.NOT_FOUND);
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
      return this.createdResponse(res, this.messages.typeCreated, response);
    } catch (error) {
      throw new HttpException(error.message || this.messages.createTypeError, HttpStatus.NOT_FOUND);
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
      return this.createdResponse(res, this.messages.typeUpdated, response);
    } catch (error) {
      throw new HttpException(error.message || this.messages.typeNotFound, HttpStatus.NOT_FOUND);
    }
  }

   
  @Post(':id/delete')
  async remove(@Param('id') id: number, @Res() res: Response ) {
    try {
      const response = await this.typeService.remove(+id);
      return this.successResponse(res, this.messages.deletedType, response);
    } catch (error) {
      throw new HttpException(error.message || this.messages.typeNotFound, HttpStatus.NOT_FOUND);
    }
  }
}

import { Controller, Get, Post, Body, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';
import { EcommerceController } from '../admin/ecommerce.controller';
import { getMessages } from 'src/messages/messages';


@Controller('categories')
export class CategoryController extends EcommerceController {
  constructor(private readonly categoryService: CategoryService) {
    super();
  }

  private messages = getMessages();

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const response = await this.categoryService.findAll();
      return this.successResponse(res, this.messages.success, response);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    try {
      const response = await this.categoryService.findOne(+id);
      return this.successResponse(res, this.messages.success, response);
    } catch (error) {
      throw new HttpException(error.message || this.messages.categoryNotFound, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  async create
  (
    @Body() createCategoryDTO: CreateCategoryDto,
    @Res() res: Response
  ) 
  {
    try {
      const response = await this.categoryService.create(createCategoryDTO);
      return this.createdResponse(res, this.messages.categoryCreated, response);
    } catch (error) {
      throw new HttpException(error.message || this.messages.createCategoryError, HttpStatus.NOT_FOUND);
    }
  }

  @Post('update')
  async update
  (
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response
  ) 
  {
    try {
      const response = await this.categoryService.update(updateCategoryDto);
      return this.createdResponse(res, this.messages.productUpdated, response);
    } catch (error) {
      throw new HttpException(error.message || this.messages.categoryNotFound, HttpStatus.NOT_FOUND);
    }
  }

   
  @Post(':id/delete')
  async remove(@Param('id') id: number, @Res() res: Response ) {
    try {
      const response = await this.categoryService.remove(+id);
      return this.successResponse(res, this.messages.deletedCategory, response);
    } catch (error) {
      throw new HttpException(error.message || this.messages.categoryNotFound, HttpStatus.NOT_FOUND);
    }
  }
}

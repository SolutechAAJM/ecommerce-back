// category.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(+id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(+id);
  }

  @Post('create') 
  createCustom(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Post(':id/update') 
  updateCustom(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Post(':id/delete') 
  removeCustom(@Param('id') id: number) {
    return this.categoryService.remove(+id);
  }
}

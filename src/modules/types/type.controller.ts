// category.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create.dto';
import { UpdateTypeDto } from './dto/update.dto';

@Controller('types')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  findAll() {
    return this.typeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.typeService.findOne(+id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateTypeDto) {
    return this.typeService.create(createCategoryDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCategoryDto: UpdateTypeDto) {
    return this.typeService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.typeService.remove(+id);
  }

  @Post('create') 
  createCustom(@Body() createCategoryDto: CreateTypeDto) {
    return this.typeService.create(createCategoryDto);
  }

  @Post(':id/update') 
  updateCustom(@Param('id') id: number, @Body() updateCategoryDto: UpdateTypeDto) {
    return this.typeService.update(+id, updateCategoryDto);
  }

  @Post(':id/delete') 
  removeCustom(@Param('id') id: number) {
    return this.typeService.remove(+id);
  }
}

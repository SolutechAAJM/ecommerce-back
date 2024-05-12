import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';

import { ProductService } from './product.service';
import { CategoryService } from '../category/category.service';
import { TypeService } from '../types/type.service';
import { UsersService } from '../users/users.service';
import { ImageProductService } from '../archive/image.service';

import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Type } from '../types/entities/type.entity';
import { Category } from '../category/entities/category.entity';
import { ImageProduct } from '../archive/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Type, Category, ImageProduct])],
  controllers: [ProductController],
  providers: [ProductService, CategoryService, TypeService, UsersService, ImageProductService],
  exports: [ProductService],
})
export class ProductModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { User } from '../users/entities/user.entity';
import { Type } from '../types/entities/type.entity';
import { Category } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { TypeService } from '../types/type.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Type, Category])],
  controllers: [ProductController],
  providers: [ProductService, CategoryService, TypeService, UsersService],
  exports: [ProductService],
})
export class ProductModule {}

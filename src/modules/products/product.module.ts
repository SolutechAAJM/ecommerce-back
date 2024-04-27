import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { User } from '../users/entities/user.entity';
import { Type } from '../types/entities/type.entity';
import { Category } from '../categoryes/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Type, Category])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}

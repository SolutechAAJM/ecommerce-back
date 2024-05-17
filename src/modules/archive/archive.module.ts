// archive.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageProduct } from './entities/image.entity';
import { ImageProductService } from './image.service';
import { ProductModule } from '../products/product.module';
import { UsersService } from '../users/users.service';
import { CategoryService } from '../category/category.service';
import { TypeService } from '../types/type.service';
import { Product } from '../products/entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { Type } from '../types/entities/type.entity';
import { ProductService } from '../products/product.service';
import { User } from '../users/entities/user.entity';
import { ArchiveController } from './archive.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ImageProduct, Product, Category, Type, User])], 
  controllers: [ArchiveController], 
  providers: [ImageProductService, ProductService, CategoryService, TypeService, UsersService], 
  exports: [ImageProductService],
})

export class ArchiveModule {}
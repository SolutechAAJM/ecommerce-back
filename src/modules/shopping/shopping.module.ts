import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartItem } from './entities/cartitem.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { Type } from '../types/entities/type.entity';
import { ShoppingCart } from './entities/shoppingcart.entity';

import { ProductService } from '../products/product.service';
import { UsersService } from '../users/users.service';
import { CategoryService } from '../category/category.service';
import { TypeService } from '../types/type.service';
import { ShoppingCartService } from './shoppingcart.service';

import { ShoppingCartController } from './shoppingcart.controller';


@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, CartItem, User, Product, Category, Type])], 
  controllers: [ShoppingCartController], 
  providers: [ShoppingCartService, ProductService, UsersService, CategoryService, TypeService], 
  exports: [ShoppingCartService],
})

export class ShoppingModule {}

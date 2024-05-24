import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartItem } from './entities/cartitem.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Category } from '../category/entities/category.entity';
import { Type } from '../types/entities/type.entity';
import { ShoppingCart } from './entities/shoppingcart.entity';
import { Order } from './entities/order.entity';


import { ProductService } from '../products/product.service';
import { UsersService } from '../users/users.service';
import { CategoryService } from '../category/category.service';
import { TypeService } from '../types/type.service';
import { ShoppingCartService } from './shoppingcart.service';
import { OrderService } from './order.service';

import { ShoppingCartController } from './shoppingcart.controller';
import { OrderController } from './order.controller';


@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, CartItem, User, Product, Category, Type, Order])], 
  controllers: [ShoppingCartController, OrderController], 
  providers: [ShoppingCartService, ProductService, UsersService, CategoryService, TypeService, OrderService], 
  exports: [ShoppingCartService, OrderService],
})

export class ShoppingModule {}

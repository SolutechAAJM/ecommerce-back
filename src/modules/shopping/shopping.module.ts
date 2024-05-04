// category.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shoppingcart.entity';
import { ShoppingCartController } from './shoppingcart.controller';
import { ShoppingCartService } from './shoppingcart.service';
import { CartItem } from './entities/cartitem.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, CartItem, User, Product])], 
  controllers: [ShoppingCartController], 
  providers: [ShoppingCartService], 
})
export class ShoppingModule {}

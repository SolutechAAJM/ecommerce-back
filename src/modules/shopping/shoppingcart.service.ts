// category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ShoppingCart } from './entities/shoppingcart.entity';
import { CartItem } from './entities/cartitem.entity';

import { ProductService } from '../products/product.service';
import { UsersService } from '../users/users.service';

import { CreateShoppingCartDto } from './dto/create.dto';
import { AddProductToCartDto } from './dto/addProduct.dto';

import { getMessages } from 'src/messages/messages';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectRepository(ShoppingCart)
        private readonly shoppingCartRepository: Repository<ShoppingCart>,

        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,

        private readonly userService: UsersService,
        private readonly productService: ProductService
    ) { }

    private messages = getMessages();

    async findOne(id: number): Promise<ShoppingCart> {
        const shopingCart = await this.shoppingCartRepository.findOne({ where: { id: id } });
        if (!shopingCart) {
            throw new Error(this.messages.shoppingCartNotFound);
        }
        return shopingCart;
    }

    async findOneByIdUser(id: number, intern:boolean = false): Promise<ShoppingCart> {
        const shoppingCart = await this.shoppingCartRepository
          .createQueryBuilder('shopping_cart')
          .where('shopping_cart.userId = :id', { id })
          .getOne();
    
        if(!intern){
            if (!shoppingCart) {
                throw new Error(this.messages.shoppingCartNotFound);
            }
        }
    
        return shoppingCart;
    }


    async createShoppingCart(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {

        const user = await this.userService.findOne(createShoppingCartDto.idUser);
        if (!user) throw new Error(this.messages.userNotFound);

        const shopping_Cart = await this.findOneByIdUser(user.id, true);
        if (shopping_Cart) return shopping_Cart;

        const shoppingCart = new ShoppingCart();
        shoppingCart.user = user;

        return await this.shoppingCartRepository.save(shoppingCart);
    }

    async addProductToCart(addProductToCartDto: AddProductToCartDto): Promise<CartItem> {

        const shoppingCart = await this.findOne(addProductToCartDto.shoppingCartId);

        if (!shoppingCart) {
            throw new Error(this.messages.shoppingCartNotFound);
        }

        const product = await this.productService.findOne(addProductToCartDto.productId);
        if (!product) throw new Error(this.messages.productNotFound);

        const cartItem = new CartItem();
        cartItem.shoppingCart = shoppingCart;
        cartItem.product = product;
        cartItem.quantity = addProductToCartDto.quantity;

        return await this.cartItemRepository.save(cartItem);
    }

}

import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './entities/shoppingcart.entity';
import { CartItem } from './entities/cartitem.entity';
import { ProductService } from '../products/product.service';
import { UsersService } from '../users/users.service';
import { CreateShoppingCartDto } from './dto/create.dto';
import { AddProductToCartDto } from './dto/addProduct.dto';
import { messages } from 'src/messages/messages';
import { modifyDto } from './dto/modify.dto';
import { Pool } from 'pg';
import { Inject } from '@nestjs/common';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectRepository(ShoppingCart)
        private readonly shoppingCartRepository: Repository<ShoppingCart>,

        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,

        private readonly userService: UsersService,
        private readonly productService: ProductService,

        @Inject('PG_CONNECTION') private pool: Pool,

    ) { }


    async findOne(id: number): Promise<ShoppingCart> {
        const shoppingCart = await this.shoppingCartRepository.findOne({ where: { id: id } });
        if (!shoppingCart) {
            throw new NotFoundException(messages.shoppingCartNotFound);
        }
        return shoppingCart;
    }

    async findOneByUserId(userId: number, intern: boolean = false): Promise<ShoppingCart> {
        const shoppingCart = await this.shoppingCartRepository
            .createQueryBuilder('shopping_cart')
            .leftJoinAndSelect('shopping_cart.items', 'cartItem')
            .leftJoinAndSelect('cartItem.product', 'product')
            .leftJoinAndSelect('product.images', 'images')
            .where('shopping_cart.user.id = :userId', { userId })
            .getOne();

        if (!intern && !shoppingCart) {
            throw new NotFoundException(messages.shoppingCartNotFound);
        }

        return shoppingCart;
    }

    async createShoppingCart(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
        const user = await this.userService.findOne(createShoppingCartDto.idUser);
        if (!user) {
            throw new NotFoundException(messages.userNotFound);
        }

        const existingCart = await this.findOneByUserId(createShoppingCartDto.idUser, true);
        if (existingCart) {
            // throw new InternalServerErrorException(messages.shoppingCartAlreadyExists);
        }

        const shoppingCart = new ShoppingCart();
        shoppingCart.user = user;

        return this.shoppingCartRepository.save(shoppingCart);
    }

    async addProductToCart(addProductToCartDto: AddProductToCartDto): Promise<CartItem> {
        const user = await this.userService.findOne(addProductToCartDto.iduser);
        if (!user) {
            throw new NotFoundException(messages.userNotFound);
        }

        let shoppingCart = await this.findOneByUserId(addProductToCartDto.iduser, true);

        if (!shoppingCart) {
            shoppingCart = await this.createShoppingCart({ idUser: addProductToCartDto.iduser });
        }

        const product = await this.productService.findOne(addProductToCartDto.productId);
        if (!product) {
            throw new NotFoundException(messages.productNotFound);
        }

        const cartItem = new CartItem();
        cartItem.shoppingCart = shoppingCart;
        cartItem.product = product;
        cartItem.quantity = addProductToCartDto.quantity;
        cartItem.priceperone = product.price;

        return this.cartItemRepository.save(cartItem);
    }


    async modify(dto: modifyDto) {
        const client = await this.pool.connect();

        try {

            const { rows } = await client.query(
                'SELECT quantity FROM cart_item WHERE id = $1',
                [dto.id]
            );

            if (rows.length === 0) {
                throw new Error('Item not found');
            }

            let quantity = 0;
            if (dto.param == "sumar") {
                quantity = rows[0].quantity + 1;
            }
            else {
                quantity = rows[0].quantity - 1;
            }

            await client.query(
                'UPDATE cart_item SET quantity = $1 WHERE id = $2',
                [quantity, dto.id]
            );

        } catch (error) {
            console.error('Error modifying quantity:', error);
            throw error;
        } finally {
            client.release();
        }
    }

    async deleteCartItem(id: number) {
        let item = await this.cartItemRepository.findOne({ where: { id: id } }); 
        if (!item) {
          throw new Error(messages.shoppingCartNotFound);
        }
        await this.cartItemRepository.delete(id);
        return item;
      }
      
}

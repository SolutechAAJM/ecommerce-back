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

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectRepository(ShoppingCart)
        private readonly shoppingCartRepository: Repository<ShoppingCart>,

        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,

        private readonly userService: UsersService,
        private readonly productService: ProductService
    ) {}

    async findOne(id: number): Promise<ShoppingCart> {
        const shoppingCart = await this.shoppingCartRepository.findOne({where: {id:id}});
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
}

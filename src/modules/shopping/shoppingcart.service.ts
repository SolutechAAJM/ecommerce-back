// category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShoppingCart } from './entities/shoppingcart.entity';
import { getMessages } from 'src/messages/messages';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectRepository(ShoppingCart)
        private readonly shoppingCartRepository: Repository<ShoppingCart>,
    ) { }

    private messages = getMessages();

}

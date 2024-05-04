
import { Controller, Get, Post,  HttpException , Body, Param, HttpStatus, Res} from '@nestjs/common';
import { Response } from 'express';
import { ShoppingCartService } from './shoppingcart.service';
import { getMessages } from 'src/messages/messages';
import { EcommerceController } from '../admin/ecommerce.controller';

@Controller('types')
export class ShoppingCartController extends EcommerceController
{
  constructor(private readonly shoppingCartService: ShoppingCartService) {
    super();
  }

  private messages = getMessages();

  
}

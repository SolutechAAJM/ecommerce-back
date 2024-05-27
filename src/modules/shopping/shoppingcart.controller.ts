
import { Controller, Get, Post,  HttpException , Body, Param, HttpStatus, Res} from '@nestjs/common';
import { Response } from 'express';
import { ShoppingCartService } from './shoppingcart.service';
import { EcommerceController } from '../admin/ecommerce.controller';
import { CreateShoppingCartDto } from './dto/create.dto';
import { AddProductToCartDto } from './dto/addProduct.dto';

import { messages } from 'src/messages/messages';
import { modifyDto } from './dto/modify.dto';

@Controller('shoppingcart')
export class ShoppingCartController extends EcommerceController
{
  constructor(private readonly shoppingCartService: ShoppingCartService) {
    super();
  }


  @Get(':iduser')
  async findByIdUser(@Param('iduser') id: number, @Res() res: Response) {
    try {
      const response = await this.shoppingCartService.findOneByUserId(id);
      return this.successResponse(res, messages.success, response);
    } catch (error) {
      throw new HttpException(error.message || messages.productNotFound, HttpStatus.NOT_FOUND);
    }
  }



  @Post('modify')
  async sumrest(
    @Body() modifyDto: modifyDto,
    @Res() res: Response
  )
  {
    try{
      const response = await this.shoppingCartService.modify(modifyDto);
      return this.createdResponse(res, messages.shoppingCartCreated, response);
    }
    catch(error){
      throw new HttpException(error.message || messages.shoppingCartNotFound, HttpStatus.NOT_FOUND);
    }
  }


  @Post('create')
  async createShoppingCart(
    @Body() createDTO: CreateShoppingCartDto,
    @Res() res: Response
  )
  {
    try{
      const response = await this.shoppingCartService.createShoppingCart(createDTO);
      return this.createdResponse(res, messages.shoppingCartCreated, response);
    }
    catch(error){
      throw new HttpException(error.message || messages.shoppingCartNotFound, HttpStatus.NOT_FOUND);
    }
  }


  @Post('addproduct')
  async addProductToShoppingCart(
    @Body() addProductToCartDto: AddProductToCartDto,
    @Res() res: Response,
  )
  {
    try{
      const response = await this.shoppingCartService.addProductToCart(addProductToCartDto);
      return this.createdResponse(res, messages.itemCartCreated, response);
    }
    catch(error){
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }

  }

  
  
}


import { Controller, Get, Post,  HttpException , Body, Param, HttpStatus, Res} from '@nestjs/common';
import { Response } from 'express';
import { ShoppingCartService } from './shoppingcart.service';
import { getMessages } from 'src/messages/messages';
import { EcommerceController } from '../admin/ecommerce.controller';
import { CreateShoppingCartDto } from './dto/create.dto';
import { AddProductToCartDto } from './dto/addProduct.dto';

@Controller('shoppingcart')
export class ShoppingCartController extends EcommerceController
{
  constructor(private readonly shoppingCartService: ShoppingCartService) {
    super();
  }

  private messages = getMessages();

  @Get(':iduser')
  async findByIdUser(@Param('iduser') id: number, @Res() res: Response) {
    try {
      const response = await this.shoppingCartService.findOne(+id);
      return this.successResponse(res, this.messages.success, response);
    } catch (error) {
      throw new HttpException(error.message || this.messages.productNotFound, HttpStatus.NOT_FOUND);
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
      return this.createdResponse(res, this.messages.shoppingCartCreated, response);
    }
    catch(error){
      throw new HttpException(error.message || this.messages.shoppingCartNotFound, HttpStatus.NOT_FOUND);
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
      return this.createdResponse(res, this.messages.itemCartCreated, response);
    }
    catch(error){
      throw new HttpException(error.message || this.messages.shoppingCartNotFound, HttpStatus.NOT_FOUND);
    }

  }
  





  
}


import { Controller, Get, Post,  HttpException , Body, Param, HttpStatus, Res, Query} from '@nestjs/common';
import { Response } from 'express';
import { EcommerceController } from '../admin/ecommerce.controller';

import { OrderService } from './order.service';

import { messages } from 'src/messages/messages';
import { CreateOrderDTO } from './dto/createOrder.dto';

@Controller('orders')
export class OrderController extends EcommerceController
{
  constructor(private readonly orderService:OrderService ) {
    super();
  }

  @Post('create')
  async createShoppingCart(
    @Body() createDTO: CreateOrderDTO,
    @Res() res: Response
  )
  {
    try{
      const response = await this.orderService.createOrder(createDTO);
      return this.createdResponse(res, messages.orderCreated, response);
    }
    catch(error){
      throw new HttpException(error.message || messages.userNotFound, HttpStatus.NOT_FOUND);
    }
  }

  @Post('delete/:id')
  async deleteOrder(
    @Param('id') id: number,
    @Res() res: Response
  ) {
    try {
      const response = await this.orderService.deleteOrder(id);
      return this.successResponse(res, messages.orderDeleted, response);
    } catch (error) {
      throw new HttpException(error.message || messages.orderNotFound, HttpStatus.NOT_FOUND);
    }
  }


  @Get('/')
  async getOrdersByIdUser(
    @Query('iduser') idUser: number,
    @Res() res: Response
  )
  {
    try{
      const response = await this.orderService.findOrderByIdUser(idUser)
      return this.createdResponse(res, messages.success, response);
    }
    catch(error){
      throw new HttpException(error.message || messages.userNotFound, HttpStatus.NOT_FOUND);
    }
  }
}

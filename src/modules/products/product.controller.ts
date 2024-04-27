import { Body, Controller, Post, Res, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import { createProductDTO } from './dto/create.dto';
import { updateProductDTO } from './dto/update.dto';
import { EcommerceController } from '../admin/ecommerce.controller';
import { getMessages } from 'src/messages/messages';

@Controller('product')
export class ProductController extends EcommerceController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  private messages = getMessages();

  @Post('create')
  async register(
    @Body() createDTO: createProductDTO,
    @Res() res: Response,
  ) {
    const response = await this.productService.create(createDTO);
    return this.createdResponse(res, this.messages.productCreated, response);
  }

  @Post('update')
  async update(
    @Body() updateDTO: updateProductDTO,
    @Res() res: Response,
  ) {
    try {
      const response = await this.productService.update(updateDTO);
      return this.createdResponse(res, this.messages.productUpdated, response);
    } catch (error) {
      throw new HttpException(error.message || this.messages.productNotFound, HttpStatus.NOT_FOUND);
    }
  }
}

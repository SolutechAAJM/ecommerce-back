import { Body, Controller, Post, Get, Res, HttpException, HttpStatus, Param } from '@nestjs/common';
import { Response } from 'express';
import { ImageProductService } from './image.service';
import { InstanceImageProductDTO } from './dto/images.dto';
import { messages } from 'src/messages/messages';

import { EcommerceController } from '../admin/ecommerce.controller';

@Controller('product/imageproduct')
export class ArchiveController extends EcommerceController {
    constructor(private readonly imageProductService: ImageProductService) { super() }

    @Post('create')
    async instanceImageProduct(
        @Body() instanceImageProductDTO: InstanceImageProductDTO,
        @Res() res: Response
    ) {
        try {
            const response = await this.imageProductService.instanceImageProduct(instanceImageProductDTO);
            return this.createdResponse(res, messages.success,  response);
        } catch (error) {
            throw new HttpException(error.message || messages.productNotFound, HttpStatus.NOT_FOUND);
        }
    }

    @Get(':productId')
    async getImagesByProductId(@Param('productId') productId: number, @Res() res: Response) {
        try {
            const response = await this.imageProductService.getImagesByProductId(productId);
            return this.successResponse(res, messages.success, response);
        } catch (error) {
            throw new HttpException(error.message || messages.productNotFound, HttpStatus.NOT_FOUND);
        }
    }
}

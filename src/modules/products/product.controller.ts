import { Body, Controller, Post } from '@nestjs/common';
import { Request } from 'express';
import { ProductService } from './product.service';
import { createProductDTO } from './dto/create.dto';


// interface RequestWithUser extends Request {
//   user: {
//     email: string;
//     role: string;
//   };
// }

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  register(
    @Body()
    createDTO: createProductDTO,
  ) {
    return this.productService.create(createDTO);
  }


}

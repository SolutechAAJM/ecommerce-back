
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProductDTO } from './dto/create.dto';
// import { getLanguageMessagesApp } from 'src/config';
// import { getMessages } from './constants/jwt.constant';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // private languageModule: string = getLanguageMessagesApp();
  // private messages = getMessages(this.languageModule);


  async create(productDTO: createProductDTO) {
    return this.productRepository.save(productDTO);
  }

}

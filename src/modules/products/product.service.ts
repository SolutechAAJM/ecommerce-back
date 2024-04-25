
import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProductDTO } from './dto/create.dto';
import { getLanguageMessagesApp } from 'src/config';
import { getMessages } from './constants/jwt.constant';
import { Product } from './entities/product.entity';
import { updateProductDTO } from './dto/update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  private languageModule: string = getLanguageMessagesApp();
  private messages = getMessages(this.languageModule);

  async create(productDTO: createProductDTO) {
    const product = this.productRepository.save(productDTO);
    return product;
  }


  async update({id, name,description, price, stock, characteristics, isOffer,dateCreation, lastModify, idType, idCategory,idLastModifier }: updateProductDTO): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: {id},
      select: ['id'],
    });

    if (!existingProduct) {
      throw new NotFoundException(this.messages.productNotFound);
    }

    Object.assign(
      existingProduct, 
      {
        id,
        name, 
        description,
        price,
        stock, 
        characteristics,
        isOffer,
        dateCreation,
        lastModify,
        idType,
        idCategory,
        idLastModifier
      }
    );

    try {
      const updatedProduct = await this.productRepository.save(existingProduct);
      return updatedProduct;
    } catch (error) {
      throw new Error(this.messages.updateProductError);
    }
  }

}
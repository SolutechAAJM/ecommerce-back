
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProductDTO } from './dto/create.dto';
import { getMessages } from 'src/messages/messages';
import { Product } from './entities/product.entity';
import { updateProductDTO } from './dto/update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  private messages = getMessages();

  async create(productDTO: createProductDTO) {
    const product = this.productRepository.save(productDTO);
    return product;
  }


  async update({ id, name, description, price, stock, characteristics, isOffer, dateCreation, lastModify, typeId, categoryId, userId }: updateProductDTO): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { id },
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
        typeId,
        categoryId,
        userId
      }
    );

    try {
      const updatedProduct = await this.productRepository.save(existingProduct);
      return updatedProduct;
    } catch (error) {
      throw new Error(this.messages.updateProductError);
    }
  }


  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException(this.messages.productNotFound);
    }
    return product;
  }

  async remove(id: number) {
    const product = this.findOne(id);

    if (!product) {
      throw new NotFoundException(this.messages.productNotFound);
    }
    await this.productRepository.delete(id);
    return product;
  }

}

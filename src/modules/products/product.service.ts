
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProductDTO } from './dto/create.dto';
import { getMessages } from 'src/messages/messages';
import { Product } from './entities/product.entity';
import { updateProductDTO } from './dto/update.dto';
import { CategoryService } from '../category/category.service';
import { TypeService } from '../types/type.service';
import { UsersService } from '../users/users.service';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly typeService: TypeService,
    private readonly userService: UsersService,
  ) { }

  private messages = getMessages();

  async create(productDTO: createProductDTO) {

    const category = await this.categoryService.findOne(productDTO.categoryId)

    if (!category) {
      throw new NotFoundException(this.messages.categoryNotFound);
    }

    const type = await this.typeService.findOne(productDTO.typeId)

    if (!type) {
      throw new NotFoundException(this.messages.typeNotFound);
    }

    const user  = await this.userService.findOne(productDTO.userId)

    if (!user) {
      throw new NotFoundException(this.messages.userNotFound);
    }

    const product = new Product();
    product.name = productDTO.name;
    product.description = productDTO.description;
    product.price = productDTO.price;
    product.stock = productDTO.stock;
    product.characteristics = productDTO.characteristics;
    product.isOffer = productDTO.isOffer;
    product.dateCreation = new Date(productDTO.dateCreation); 
    product.lastModify = new Date(productDTO.lastModify); 
    product.type = type
    product.category = category;
    product.user = user;

    const response = await this.productRepository.save(product);
    return response;
  }


  async update({ id, name, description, price, stock, characteristics, isOffer, dateCreation, lastModify, typeId, categoryId, userId }: updateProductDTO): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { id },
      select: ['id'],
    });

    if (!existingProduct) {
      throw new NotFoundException(this.messages.productNotFound);
    }

    const category = await this.categoryService.findOne(categoryId)
    if (!category) {
      throw new NotFoundException(this.messages.categoryNotFound);
    }

    const type = await this.typeService.findOne(typeId)
    if (!type) {
      throw new NotFoundException(this.messages.typeNotFound + type+ typeId);
    }

    const user  = await this.userService.findOne(userId)
    if (!user) {
      throw new NotFoundException(this.messages.userNotFound);
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
        type,
        category,
        user
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

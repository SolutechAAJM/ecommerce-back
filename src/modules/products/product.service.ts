
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, MoreThanOrEqual } from 'typeorm';

import { createProductDTO } from './dto/create.dto';
import { InstanceImageProductDTO } from '../archive/dto/images.dto';
import { SearchDTO } from './dto/search.dto';

import { Product } from './entities/product.entity';
import { updateProductDTO } from './dto/update.dto';
import { CategoryService } from '../category/category.service';
import { TypeService } from '../types/type.service';
import { UsersService } from '../users/users.service';
import { ImageProductService } from '../archive/image.service';

import { messages } from 'src/messages/messages';

import { SearchType } from './enum/search.enum';
import { Pool } from 'pg';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly typeService: TypeService,
    private readonly userService: UsersService,
    // private readonly imageProductService: ImageProductService
    @Inject('PG_CONNECTION') private pool: Pool,

  ) { }


  async create(productDTO: createProductDTO) {

    const category = await this.categoryService.findOne(productDTO.categoryId)

    if (!category) {
      throw new NotFoundException(messages.categoryNotFound);
    }

    const type = await this.typeService.findOne(productDTO.typeId)

    if (!type) {
      throw new NotFoundException(messages.typeNotFound);
    }

    const user = await this.userService.findOne(productDTO.userId)

    if (!user) {
      throw new NotFoundException(messages.userNotFound);
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


    const productSaved = await this.productRepository.save(product);

    // if(productDTO.urlImages.length){
    //   let instaceImageDTO = new InstanceImageProductDTO;
    //   instaceImageDTO.url = productDTO.urlImages;
    //   instaceImageDTO.idProduct = productSaved.id;

    //   const imagesSaved = await this.imageProductService.instanceImageProduct(instaceImageDTO)
    //   const response = {
    //     productSaved: productSaved, 
    //     imageSaved: imagesSaved
    //   }
    //   return response;
    // }

    const response = {
      productSaved: productSaved,
      imageSaved: []
    }

    return response;
  }


  async update({ id, name, description, price, stock, characteristics, isOffer, dateCreation, lastModify, typeId, categoryId, userId }: updateProductDTO): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { id },
      select: ['id'],
    });

    if (!existingProduct) {
      throw new NotFoundException(messages.productNotFound);
    }

    const category = await this.categoryService.findOne(categoryId)
    if (!category) {
      throw new NotFoundException(messages.categoryNotFound);
    }

    const type = await this.typeService.findOne(typeId)
    if (!type) {
      throw new NotFoundException(messages.typeNotFound + type + typeId);
    }

    const user = await this.userService.findOne(userId)
    if (!user) {
      throw new NotFoundException(messages.userNotFound);
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
      throw new Error(messages.updateProductError);
    }
  }


  async findAll(): Promise<any> {
    const client = await this.pool.connect();
    try {
      const products = await this.productRepository.find();

      const productIds: Array<string> = products.map(product => `${product.id}`);

      const results = await client.query(
        `SELECT * FROM image_product WHERE "productId" = ANY($1::int[])`,
        [productIds.map(id => parseInt(id))]
      );

      const imagesByProductId: Record<string, Array<any>> = {};

      results.rows.forEach((image) => {
        const productId = image.productId;
        if (!imagesByProductId[productId]) {
          imagesByProductId[productId] = [];
        }
        imagesByProductId[productId].push(image);
      });

      products.forEach((product) => {
        product.images = imagesByProductId[product.id] || [];
      });

      return products;
    } finally {
      client.release();
    }


  }

  async findOne(id: number): Promise<Product> {

    const client = await this.pool.connect();

    try {
      const product = await this.productRepository.findOne({ where: { id: id } });
      if (!product) {
        throw new NotFoundException(messages.productNotFound);
      }
      const results = await client.query(
        `SELECT * FROM image_product WHERE "productId" = $1`,
        [id]
      );
      product.images = results.rows;
      return product;

    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  async remove(id: number) {
    const product = this.findOne(id);

    if (!product) {
      throw new NotFoundException(messages.productNotFound);
    }
    await this.productRepository.delete(id);
    return product;
  }


  async filterProducts(dataFilter: SearchDTO): Promise<Product[]> {
    const { typeSearch, textSearch, idType, idCategory, minPrice, maxPrice } = dataFilter;

    let results: any;

    switch (typeSearch) {
      case SearchType.ByName:
        results = await this.productRepository.find({
          where: { name: Like(`%${textSearch}%`) },
        });
        break;

      case SearchType.ByCategory:
        if (!idCategory) throw new Error(messages.categoryNotFound);
        const category = await this.categoryService.findOne(idCategory);
        if (!category) throw new Error(messages.categoryNotFound);

        results = await this.productRepository.find({
          relations: ['category'],
          where: { category: { id: idCategory } },
        });
        break;

      case SearchType.ByType:
        if (!idType) throw new Error(messages.typeNotFound);
        const type = await this.typeService.findOne(idType);
        if (!type) throw new Error(messages.typeNotFound);

        results = await this.productRepository.find({
          relations: ['type'],
          where: { type: { id: idType } },
        });
        break;

      case SearchType.ByPriceRange:
        if (minPrice === undefined || maxPrice === undefined) throw new Error(messages.priceRangeInvalid);
        results = await this.productRepository.find({
          where: { price: Between(minPrice, maxPrice) },
        });
        break;

      // case SearchType.ByRating:
      //     const rating = parseFloat(textSearch);
      //     results = await this.productRepository.find({
      //         where: { rating: MoreThanOrEqual(rating) },
      //     });
      //     break;

      default:
        throw new Error(messages.typeSearchNoSupported);
    }

    return results;
  }

}

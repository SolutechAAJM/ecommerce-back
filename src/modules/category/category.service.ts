// category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';
import { messages } from 'src/messages/messages';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }


    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id: id } });
        if (!category) {
            throw new NotFoundException(messages.categoryNotFound);
        }
        return category;
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new Category();
        category.name = createCategoryDto.name;
        category.description = createCategoryDto.description;
        return this.categoryRepository.save(category);
    }

    async update(updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id: updateCategoryDto.id } });
     
        if (!category) {
           throw new NotFoundException(messages.categoryNotFound);
        }
        
        if (updateCategoryDto.name) {
            category.name = updateCategoryDto.name;
        }
        if (updateCategoryDto.description) {
            category.description = updateCategoryDto.description;
        }
        if (updateCategoryDto.active !== undefined) {
            category.active = updateCategoryDto.active;
        }
        return this.categoryRepository.save(category);
    }

    async remove(id: number) {
        const category = await this.findOne(id);

        if (!category) {
           throw new NotFoundException(messages.categoryNotFound);
        }
        await this.categoryRepository.delete(id);
        return category;
    }
}

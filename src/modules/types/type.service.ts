// category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';
import { CreateTypeDto } from './dto/create.dto';
import { UpdateTypeDto } from './dto/update.dto';

@Injectable()
export class TypeService {
    constructor(
        @InjectRepository(Type)
        private readonly typeRepository: Repository<Type>,
    ) { }

    async findAll(): Promise<Type[]> {
        return this.typeRepository.find();
    }

    async findOne(id: number): Promise<Type> {
        return await this.typeRepository.findOne({ where: { id: id } });
    }

    async create(createCategoryDto: CreateTypeDto): Promise<Type> {
        const category = new Type();
        category.name = createCategoryDto.name;
        category.description = createCategoryDto.description;
        return this.typeRepository.save(category);
    }

    async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type> {
        const category = await this.typeRepository.findOne({ where: { id: id } });
        if (!category) {
            throw new Error('Category not found');
        }
        if (updateTypeDto.name) {
            category.name = updateTypeDto.name;
        }
        if (updateTypeDto.description) {
            category.description = updateTypeDto.description;
        }
        if (updateTypeDto.active !== undefined) {
            category.active = updateTypeDto.active;
        }
        return this.typeRepository.save(category);
    }

    async remove(id: number): Promise<void> {
        await this.typeRepository.delete(id);
    }
}

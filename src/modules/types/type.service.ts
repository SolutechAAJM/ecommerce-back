// category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';
import { CreateTypeDto } from './dto/create.dto';
import { UpdateTypeDto } from './dto/update.dto';
import { getMessages } from 'src/messages/messages';

@Injectable()
export class TypeService {
    constructor(
        @InjectRepository(Type)
        private readonly typeRepository: Repository<Type>,
    ) { }

    private messages = getMessages();

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

    async update(updateTypeDto: UpdateTypeDto): Promise<Type> {
        const category = await this.typeRepository.findOne({ where: { id: updateTypeDto.id } });
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

    async remove(id: number) {
        const type = this.findOne(id);

        if (!type) {
           throw new NotFoundException(this.messages.typeNotFound);
        }
        await this.typeRepository.delete(id);
        return type;
    }
}

// category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';
import { CreateTypeDto } from './dto/create.dto';
import { UpdateTypeDto } from './dto/update.dto';
import { messages } from 'src/messages/messages';

@Injectable()
export class TypeService {
    constructor(
        @InjectRepository(Type)
        private readonly typeRepository: Repository<Type>,
    ) { }


    async findAll(): Promise<Type[]> {
        return await this.typeRepository.find();
    }

    async findOne(id: number): Promise<Type> {
        return await this.typeRepository.findOne({ where: { id: id } });
    }

    async create(createTypeDto: CreateTypeDto): Promise<Type> {
        const type = new Type();
        type.name = createTypeDto.name;
        type.description = createTypeDto.description;
        type.urlimage = createTypeDto.urlimage;

        return await this.typeRepository.save(type);
    }

    async update(updateTypeDto: UpdateTypeDto): Promise<Type> {
        const type = await this.typeRepository.findOne({ where: { id: updateTypeDto.id } });
        if (!type) {
            throw new Error(messages.typeNotFound);
        }
        if (updateTypeDto.name) {
            type.name = updateTypeDto.name;
        }
        if (updateTypeDto.description) {
            type.description = updateTypeDto.description;
        }
        if (updateTypeDto.active !== undefined) {
            type.active = updateTypeDto.active;
        }
        if (updateTypeDto.urlimage) {
            type.urlimage = updateTypeDto.urlimage;
        }
        return this.typeRepository.save(type);
    }

    async remove(id: number) {
        const type = await this.findOne(id);
        if (!type) {
           throw new NotFoundException(messages.typeNotFound);
        }
        await this.typeRepository.delete(id);
        return type;
    }
}

// category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';

import { CreateOrderDTO } from './dto/createOrder.dto';
import { messages } from 'src/messages/messages';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly userService: UsersService
    ) { }


    async createOrder(createOrderDto: CreateOrderDTO): Promise<Order> {
        const user = await this.userService.findOne(createOrderDto.idUser);

        if (!user) throw new Error(messages.userNotFound);

        const newOrder = this.orderRepository.create({
            orderStatus: createOrderDto.orderStatus,
            orderAddress: createOrderDto.orderAddress,
            dateOrder: createOrderDto.dateOrder,
            user: user,
        });

        return await this.orderRepository.save(newOrder);
    }


    async deleteOrder(id: number) {
        
        const order = await this.orderRepository.findOne({ where: { id: id } });

        if (!order) {
            throw new NotFoundException(messages.orderNotFound);
        }


        return await this.orderRepository.delete(id);
    }




}

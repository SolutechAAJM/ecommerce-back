// category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/orderDetails.entity';

import { CreateOrderDTO } from './dto/createOrder.dto';
import { messages } from 'src/messages/messages';
import { UsersService } from '../users/users.service';
import { ProductService } from '../products/product.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,
        private readonly userService: UsersService,
        private readonly productService: ProductService,
    ) { }

    async createOrder(createOrderDto: CreateOrderDTO) {
        const user = await this.userService.findOne(createOrderDto.idUser);
        if (!user) throw new Error(messages.userNotFound);
        const newOrder = this.orderRepository.create({
            orderStatus: createOrderDto.orderStatus,
            orderAddress: createOrderDto.orderAddress,
            dateOrder: createOrderDto.dateOrder,
            user: user,
        });
        let order = await this.orderRepository.save(newOrder);

        let details: Array<any> = [];
        for (let detail of createOrderDto.products) {
            const product = await this.productService.findOne(detail.productId);
            if (!product) throw new Error(`${messages.productNotFound}:id->${detail.productId}`);

            const orderDetail = await this.orderDetailRepository.save({
                quantityProduct: detail.quantityProduct,
                unitPrice: detail.unitPrice,
                product: product,
                order: order,
            });

            if (!orderDetail) throw new Error(messages.ErrorCreatingOrder);

            let newDetail = {
                quantityProduct: orderDetail.quantityProduct,
                unitPrice: orderDetail.unitPrice,
                product: {
                    id: orderDetail.product.id,
                    name: orderDetail.product.name,
                    description: orderDetail.product.description
                }
            }
            details.push(newDetail);
        }

        return {
            order: order,
            detail: details,
        }
    }

    async deleteOrder(id: number) {
        const order = await this.orderRepository.findOne({ where: { id: id } });
        if (!order) {
            throw new NotFoundException(messages.orderNotFound);
        }

        await this.orderDetailRepository.delete({ order });
        
        return await this.orderRepository.delete(id);
    }

    async findOrderByIdUser(idUser: number) {
        const user = await this.userService.findOne(idUser);
        if (!user) throw new Error(messages.userNotFound);

        const orders = await this.orderRepository.find({
            where: { user: { id: idUser } },
            relations: ['orderDetails', 'orderDetails.product'],
        });

        return orders;
    }
}

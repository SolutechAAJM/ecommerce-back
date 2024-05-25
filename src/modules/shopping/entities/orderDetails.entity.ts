import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity('order_detail')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantityProduct: number;

  @Column()
  unitPrice: number;

  @ManyToOne(() => Product, (product) => product.orderDetails, { eager: true })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderDetails, { eager: true })
  order: Order;
}

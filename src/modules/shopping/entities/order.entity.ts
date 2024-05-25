import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderStatus: string;

  @Column()
  orderAddress: string;

  @Column()
  dateOrder: Date;

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  user: User;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  orderDetails: OrderDetail[];
}

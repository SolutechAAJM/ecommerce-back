import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { ShoppingCart } from 'src/modules/shopping/entities/shoppingcart.entity';
import { Order } from 'src/modules/shopping/entities/order.entity';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  fullName: string;

  @Column({ length: 30, nullable: false })
  email: string;

  @Column({ length: 300, nullable: false })
  password: string;

  @Column({ length: 40, nullable: false })
  role: string;

  @Column({ type: 'timestamp', nullable: false })
  createdAt: Date;

  @Column({ length: 50, nullable: false })
  address: string;

  @Column({ length: 20, nullable: false })
  phone: string;

  @Column({ nullable: false })
  creditPoints: number;

  @Column({ nullable: false })
  isActive: boolean;

  @OneToMany(() => Product, product => product.user)  
  products: Product[];

  @OneToMany(() => ShoppingCart, shoppingCart => shoppingCart.user)
  shoppingCarts: ShoppingCart[];

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany  } from 'typeorm';
import { Type } from 'src/modules/types/entities/type.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { CartItem } from 'src/modules/shopping/entities/cartitem.entity';
import { ShoppingCart } from 'src/modules/shopping/entities/shoppingcart.entity';
import { ImageProduct } from 'src/modules/archive/entities/image.entity';
import { OrderDetail } from 'src/modules/shopping/entities/orderDetails.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ nullable: false })
  stock: number;

  @Column({ nullable: true })
  characteristics: string;

  @Column({ default: false, nullable: false })
  isOffer: boolean;

  @Column({ nullable: false })
  dateCreation: Date;

  @Column({ nullable: true })
  lastModify: Date;

  @ManyToOne(() => Type, type => type.products, { nullable: true })
  type: Type;

  @ManyToOne(() => Category, category => category.products, { nullable: true })
  category: Category;

  @ManyToOne(() => User, user=> user.products, { nullable: true })
  user: User;

  @OneToMany(() => CartItem, cartItem => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => ImageProduct, imageProduct => imageProduct.product)
  images: ImageProduct[];

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.product)
  orderDetails: OrderDetail[];
 
}

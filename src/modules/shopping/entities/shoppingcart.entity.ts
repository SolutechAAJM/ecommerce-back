import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { CartItem } from './cartitem.entity';

@Entity('shopping_cart')
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.shoppingCarts)
  user: User;

  @OneToMany(() => CartItem, cartItem => cartItem.shoppingCart)
  items: CartItem[];
}

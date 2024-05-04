import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ShoppingCart } from './shoppingcart.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity('cart_item')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.items)
  shoppingCart: ShoppingCart;

  @ManyToOne(() => Product, product => product.cartItems)
  product: Product;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';

@Entity({name: 'category'})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true, nullable: false })
  active: boolean;

  @OneToMany(() => Product, product => product.category) 
  products: Product[];
}

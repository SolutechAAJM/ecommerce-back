import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne  } from 'typeorm';
import { Type } from 'src/modules/types/entities/type.entity';
import { Category } from 'src/modules/categoryes/entities/category.entity';
import { User } from 'src/modules/users/entities/user.entity';

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
}

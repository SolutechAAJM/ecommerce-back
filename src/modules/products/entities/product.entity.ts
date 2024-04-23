import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, type: 'float' })
  price: number;

  @Column({ nullable: false })
  stock: number;

  @Column({ nullable: false })
  characteristics: string;

  @Column({ nullable: false, default: false })
  isOffer: boolean;

  @Column({ nullable: false, type: 'timestamp' })
  dateCreation: Date;

  @Column({ nullable: true, type: 'timestamp' })
  lastModify: Date;

  @Column({ nullable: false })
  idType: number;

  @Column({ nullable: false })
  idCategory: number;

  @Column({ nullable: false })
  idLastModifier: number;
}

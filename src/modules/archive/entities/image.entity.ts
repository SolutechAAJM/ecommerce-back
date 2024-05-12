import { Product } from "src/modules/products/entities/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity('image_product')
export class ImageProduct {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    url:string

    @ManyToOne(() => Product, product => product.images)
    product: Product;

}
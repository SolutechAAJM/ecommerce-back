import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository } from "typeorm"; 
import { messages } from "src/messages/messages";
import { ImageProduct } from "./entities/image.entity";
import { InstanceImageProductDTO } from "./dto/images.dto";
import { ProductService } from "../products/product.service";

@Injectable()
export class ImageProductService {
    constructor(
        private readonly productService: ProductService,
        
    ) {}

    async instanceImageProduct(instaceImageProductDTO: InstanceImageProductDTO): Promise<ImageProduct[]> {
        const product = await this.productService.findOne(instaceImageProductDTO.idProduct);
        if (!product) {
            throw new NotFoundException(messages.productNotFound);
        }

        const imageProductRepository: Repository<ImageProduct> = getRepository(ImageProduct); 

        const ImageProductSaved: ImageProduct[] = [];
        for (const url of instaceImageProductDTO.url) {
            const imageProduct = new ImageProduct();
            imageProduct.url = url;
            imageProduct.product = product;

            const savedImageProduct = await imageProductRepository.save(imageProduct); 
            ImageProductSaved.push(savedImageProduct);
        }

        return ImageProductSaved;
    }
}

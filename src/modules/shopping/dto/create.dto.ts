export class CreateShoppingCartDto {
    readonly idUser: number;
    readonly products: ProductDto[];
}

class ProductDto {
    readonly id: number;
    readonly name: string;
    readonly quantity: number;
}


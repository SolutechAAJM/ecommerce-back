export class AddProductToCartDto {
    readonly iduser: number;
    readonly shoppingCartId: number;
    readonly productId: number;
    readonly quantity: number;
    readonly priceperone: number;
}

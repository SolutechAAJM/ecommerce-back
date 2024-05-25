export class CreateOrderDTO {
    orderStatus: string
    orderAddress: string
    dateOrder: Date
    idUser: number
    products: ProductOrderDTO[]
}


class ProductOrderDTO
{
    productId: number
    quantityProduct: number
    unitPrice:number
}
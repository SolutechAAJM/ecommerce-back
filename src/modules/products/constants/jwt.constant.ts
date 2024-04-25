export const jwtConstants = {
  secret: 'no utilizar esta palabra en producción',


  outputEnglishMessages:{
    productNotFound: 'Product not found',
    updateProductError: 'Error al actualizar el producto',
  },

  outputSpanishMessages:{
    productNotFound: 'Producto no encontrado',
    updateProductError: 'Error updating product',
  }
};


export const getMessages = (language: string) => {
  return (language == 'english')? jwtConstants.outputEnglishMessages: jwtConstants.outputSpanishMessages;
}

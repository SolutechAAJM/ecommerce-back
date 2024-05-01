import { getLanguageApp } from "src/config";

export const messages = {
    outputEnglishMessages: {
        success: 'Success',

        userCreated: 'User created correctly',
        successLogin: 'Success login',
        userAlreadyExist: 'User already exists with this email',
        emailIsWrong: 'email is wrong',
        passwordIsWrong: 'password is wrong',
        userNotFound: 'User not found',
        
        productCreated: 'Successfully created product',
        productUpdated: 'It was updated correctly',
        productNotFound: 'Product not found',
        createProductError: 'Error creating product',
        updateProductError: 'Error updating product',
        deletedProduct: 'Successfully deleted product',

        categoryCreated: 'Successfully created category',
        categoryUpdated: 'It was updated correctly',
        categoryNotFound: 'Category not found',
        createCategoryError: 'Error creating category',
        updateCategoryError: 'Error updating category',
        deletedCategory: 'Successfully deleted category',

        typeCreated: 'Successfully created type',
        typeUpdated: 'It was updated correctly',
        typeNotFound: 'Type not found',
        createTypeError: 'Error creating type',
        updateTypeError: 'Error updating type',
        deletedType: 'Successfully deleted type',

        
    },

    outputSpanishMessages: {
        success: 'Success',

        userCreated: 'Usuario creado correctamente',
        successLogin: 'Inicio de sesión exitoso',
        userAlreadyExist: 'Ya existe un usuario con este correo electronico.',
        emailIsWrong: 'No existe niguna cuenta con este correo electronico',
        passwordIsWrong: 'Contraseña incorrecta',
        userNotFound: 'El usuario no existe',

        productCreated: 'Producto creado correctamente',
        productUpdated: 'Se actualizo correctamente',
        productNotFound: 'Producto no encontrado',
        createProductError: 'Error creando el producto',
        updateProductError: 'Error al actualizar el producto',
        deletedProduct: 'Producto eliminado con exito',


        categoryCreated: 'Categoria creada correctamente',
        categoryUpdated: 'Se actualizo la categoria correctamente',
        categoryNotFound: 'Categoria no encontrada',
        createCategoryError: 'Error creando la categoria',
        updateCategoryError: 'Error al actualizar la categoria',
        deletedCategory: 'Categoria eliminada correctamente',


        typeCreated: 'Tipo creado correctamente',
        typeUpdated: 'Se actualizo el tipo correctamente',
        typeNotFound: 'Tipo no encontrado',
        createTypeError: 'Error creando el tipo',
        updateTypeError: 'Error al actualizar el tipo',
        deletedType: 'Tipo eliminado correctamente',


    }
}


export const getMessages = () => {
    const languageModule: string = getLanguageApp();
    return (languageModule == 'english')? messages.outputEnglishMessages: messages.outputSpanishMessages;
}
  
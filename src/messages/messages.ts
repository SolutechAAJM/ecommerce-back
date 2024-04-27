import { getLanguageMessagesApp } from "src/config";

export const messages = {
    outputEnglishMessages: {
        success: 'Success',

        userCreated: 'User created correctly',
        successLogin: 'Success login',
        userAlreadyExist: 'User already exists with this email',
        emailIsWrong: 'email is wrong',
        passwordIsWrong: 'password is wrong',
        
        productCreated: 'Successfully created product',
        productUpdated: 'It was updated correctly',
        productNotFound: 'Product not found',
        createProductError: 'Error creating product',
        updateProductError: 'Error updating product',

    },

    outputSpanishMessages: {
        success: 'Success',

        userCreated: 'Usuario creado correctamente',
        successLogin: 'Inicio de sesión exitoso',
        userAlreadyExist: 'Ya existe un usuario con este correo electronico.',
        emailIsWrong: 'No existe niguna cuenta con este correo electronico',
        passwordIsWrong: 'Contraseña incorrecta',

        productCreated: 'Producto creado correctamente',
        productUpdated: 'Se actualizo correctamente',
        productNotFound: 'Producto no encontrado',
        createProductError: 'Error creando el producto',
        updateProductError: 'Error al actualizar el producto',
    }
}


export const getMessages = () => {
    const languageModule: string = getLanguageMessagesApp();
    return (languageModule == 'english')? messages.outputEnglishMessages: messages.outputSpanishMessages;
}
  
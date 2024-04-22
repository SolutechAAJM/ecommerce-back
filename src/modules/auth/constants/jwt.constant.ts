export const jwtConstants = {
  secret: 'no utilizar esta palabra en producción',


  outputEnglishMessages:{
    useralreadyexist: 'User already exists',

  },

  outputSpanishMessages:{
    useralreadyexist: 'El usuario ya existe!',

  }
};


export const getMessages = (language) => {
  return (language == 'english')? jwtConstants.outputEnglishMessages: jwtConstants.outputSpanishMessages;
}

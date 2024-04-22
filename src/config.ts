/**
 * Retrieve App language configuration
 */

const config = {
    language:'english',
    // language:'spanish',
}

export const getLanguageApp = () => {
    return config.language;
}

export const getLanguageMessagesApp = () => {
    return (config.language == 'english') ? 'outputEnglishMessages': 'outputSpanishMessages';
}


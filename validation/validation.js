const { responseError } = require('../error/response-error');

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false,
       
    });
    if (result.error) {
        console.error('Validation failed:', result.error.details);
        throw new responseError(400, result.error.message);
    } else {
        return result.value;
    }
}

module.exports = {
    validate
}
const {responseError} = require('../error/response-error');




const errorMiddleware = async(err, req, res, next) => {
    if(!err) {
        next();
        return;
    }

    if (err instanceof responseError) {
        res.status(err.statusCode).json({
            errors: err.message
        });    
    }else {
        res.status(500).json({
            errors: err.message
        }),end();    
    }
}

module.exports = {
    errorMiddleware
}
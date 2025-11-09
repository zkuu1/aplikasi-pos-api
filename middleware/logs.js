const logRequest = (req, res, next) => {
    console.log('terjadi request pada : ', req.path)
    next();
}

module.exports = logRequest;
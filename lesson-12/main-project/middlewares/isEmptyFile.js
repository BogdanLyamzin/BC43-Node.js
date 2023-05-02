const {HttpError} = require("../helpers");

const isEmptyFile = (req, res, next)=> {
    if(!req.file) {
        next(HttpError(400, "File not found"))
    }
    next()
}

module.exports = isEmptyFile;
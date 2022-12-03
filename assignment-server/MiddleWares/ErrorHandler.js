const { Error } = require("mongoose")
class APIError {
    statusCode;
    message;
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        
    }
}

const ErrorHandler = (error, req, res, next) => {
    if (error instanceof APIError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }
    if (error instanceof Error) {
        if (error instanceof Error.ValidationError) {
            const errorObject = Object.fromEntries(Object.entries(error.errors).map(([key, value]) => [key, value.message]))

            return res.status(400).json({
                message: errorObject
            })
        }
    }
    return res.status(500).json({
        message: error.toString()
    });
}

exports.APIError = APIError
exports.ErrorHandler = ErrorHandler;
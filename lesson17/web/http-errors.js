import { ERROR_CODES } from '../errors/errors.js'

const HTTP_STATUS_CODES = {
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500
}

const ERRORS_MAPPER = {
    [ERROR_CODES.INVALID_USER]: function (err) {
        return {
            code: HTTP_STATUS_CODES.BAD_REQUEST,
            body: { message: err.message }
        }
    },
    [ERROR_CODES.INVALID_PARAM]: function (err) {
        return {
            code: HTTP_STATUS_CODES.BAD_REQUEST,
            body: { message: err.message }
        }
    },
    DEFAULT: function (err) {
        return {
            code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            body: { message: err.message }
        }
    }
}

function toHttpError(err) {
    const errorMapper = ERRORS_MAPPER[err.code]
    if (errorMapper) {
        return errorMapper(err)
    }
    return ERRORS_MAPPER.DEFAULT(err)


}

export default function errorHandler(err, req, res, next) {
    if (err.code) {
        const httpErr = toHttpError(err);
        res.status(httpErr.status)
        res.json(httpErr.body)
        return 
    } 
    next()
}
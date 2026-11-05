import { ERROR_CODES } from '../errors/errors.js'

const HTTP_STATUS_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
}

const ERRORS_MAPPER = {
    [ERROR_CODES.INVALID_USER]: function (err) {
        return {
            status: HTTP_STATUS_CODES.UNAUTHORIZED,
            body: { message: err.message }
        }
    },
    [ERROR_CODES.INVALID_PARAM]: function (err) {
        return {
            status: HTTP_STATUS_CODES.BAD_REQUEST,
            body: { message: err.message }
        }
    },
    [ERROR_CODES.NOT_FOUND]: function (err) {
        return {
            status: HTTP_STATUS_CODES.NOT_FOUND,
            body: { message: err.message }
        }
    },
    [ERROR_CODES.CONFLICT]: function (err) {
        return {
            status: HTTP_STATUS_CODES.CONFLICT,
            body: { message: err.message }
        }
    },
    DEFAULT: function (err) {
        return {
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            body: { message: err.message }
        }
    }
}

function toHttpError(err) {
    const errorMapper = ERRORS_MAPPER[err.code] ?? ERRORS_MAPPER.DEFAULT
    return errorMapper(err)
}

export default function errorHandler(err, req, res, next) {
    if (res.headersSent || !err || !err.code) return next(err)
    const mappedError = toHttpError(err)
    res.status(mappedError.status).json(mappedError.body)
}
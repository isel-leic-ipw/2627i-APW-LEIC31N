import { ERROR_CODES } from '../errors.js';

function HttpErrorResponse(status, message, description) {
    this.status = status;
    this.error = { message, description };
}

const HTTP_STATUS_CODES = {
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export default function mapToHttpError(error) {
    switch (error.code) {
        case ERROR_CODES.INVALID_PARAMETER_CODE:
            return new HttpErrorResponse(HTTP_STATUS_CODES.BAD_REQUEST, error.message, error.description);
        case ERROR_CODES.LIST_NOT_FOUND_CODE:
        case ERROR_CODES.ITEM_NOT_FOUND_CODE:
            return new HttpErrorResponse(HTTP_STATUS_CODES.NOT_FOUND, error.message, error.description);
        default:
            return new HttpErrorResponse(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
}
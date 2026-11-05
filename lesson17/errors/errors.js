
export const ERROR_CODES = {
    INVALID_USER: 1,
    INVALID_PARAM: 2,
    NOT_FOUND: 3,
    CONFLICT: 4
}   


export default {
    INVALID_USER: function(msg) {
        return {
            code: ERROR_CODES.INVALID_USER,
            message: msg,
        }
    },
    INVALID_PARAM: function(paramName, msg) {
        return {
            code: ERROR_CODES.INVALID_PARAM,
            message: `Missing or invalid parameter: ${paramName}. ${msg}`,
        }
    },
    NOT_FOUND: function(resource) {
        return {
            code: ERROR_CODES.NOT_FOUND,
            message: `${resource} not found`
        }
    },
    CONFLICT: function(msg) {
        return {
            code: ERROR_CODES.CONFLICT,
            message: msg
        }
    }

}
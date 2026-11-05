
export const ERROR_CODES = {
    INVALID_USER: 99,
    INVALID_PARAM: 1523
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
    }

}
export const ERROR_CODES = {
    INVALID_PARAMETER_CODE: 1,
    LIST_NOT_FOUND_CODE: 2,
    ITEM_NOT_FOUND_CODE: 3
};

export default {
    INVALID_PARAMETER: (name, description) => ({
        code: ERROR_CODES.INVALID_PARAMETER_CODE,
        message: `Invalid argument ${name}`,
        description
    }),
    LIST_NOT_FOUND: (listId) => ({
        code: ERROR_CODES.LIST_NOT_FOUND_CODE,
        message: `List with id ${listId} not found`
    }),
    ITEM_NOT_FOUND: (itemId) => ({
        code: ERROR_CODES.ITEM_NOT_FOUND_CODE,
        message: `Item with id ${itemId} not found`
    })
};
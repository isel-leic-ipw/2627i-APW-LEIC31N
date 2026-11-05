import errors from '../errors/errors.js';

export default function (dataModule) {
    if (!dataModule) throw new Error("Data module is required");
    return {
        getAllLists,
        createList,
        getList,
        updateList,
        deleteList,
        addListItem,
        deleteListItem,
        toggleListItem
    };

    async function getAllLists(userId, query) {
        validateUser(userId);
        return dataModule.getAllLists(userId, query);
    }

    async function createList(userId, name, description) {
        validateUser(userId);
        validateName(name, 'List name is required');
        return dataModule.createList(userId, name, description);
    }

    async function getList(userId, listId) {
        validateUser(userId);
        validateId(listId, 'listId');
        return dataModule.getList(userId, listId)
            .then(list => requireResource(list, 'Shopping list'));
    }

    async function updateList(userId, listId, name, description) {
        validateUser(userId);
        validateId(listId, 'listId');
        validateName(name, 'List name is required');
        return dataModule.updateList(userId, listId, name, description)
            .then(list => requireResource(list, 'Shopping list'));
    }

    async function deleteList(userId, listId) {
        validateUser(userId);
        validateId(listId, 'listId');
        return dataModule.deleteList(userId, listId).then(deleted => {
            if (!deleted) throw errors.NOT_FOUND('Shopping list');
        });
    }

    async function addListItem(userId, listId, name, quantity) {
        validateUser(userId);
        validateId(listId, 'listId');
        validateName(name, 'Item name is required');
        if (!Number.isInteger(quantity) || quantity < 1) {
            throw errors.INVALID_PARAM('quantity', 'Quantity must be a positive integer');
        }
        return dataModule.addListItem(userId, listId, name, quantity)
            .then(item => requireResource(item, 'Shopping list'));
    }

    async function deleteListItem(userId, listId, itemId) {
        validateUser(userId);
        validateId(listId, 'listId');
        validateId(itemId, 'itemId');
        return dataModule.deleteListItem(userId, listId, itemId).then(deleted => {
            if (!deleted) throw errors.NOT_FOUND('Shopping-list item');
        });
    }

    async function toggleListItem(userId, listId, itemId) {
        validateUser(userId);
        validateId(listId, 'listId');
        validateId(itemId, 'itemId');
        return dataModule.toggleListItem(userId, listId, itemId)
            .then(item => requireResource(item, 'Shopping-list item'));
    }

    function validateUser(userId) {
        if (!userId) throw errors.INVALID_USER('A valid user token is required');
    }

    function validateId(id, name) {
        if (!Number.isInteger(id) || id < 1) {
            throw errors.INVALID_PARAM(name, 'ID must be a positive integer');
        }
    }

    function validateName(name, message) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw errors.INVALID_PARAM('name', message);
        }
    }

    function requireResource(resource, name) {
        if (!resource) throw errors.NOT_FOUND(name);
        return resource;
    }
}
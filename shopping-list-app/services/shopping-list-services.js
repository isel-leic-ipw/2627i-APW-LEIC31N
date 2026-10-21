import Errors from '../errors.js';

export default function createShoppingListServices(data) {
    return {
        getAllLists,
        getList,
        createNewList,
        removeList,
        addItemToList,
        toggleItem,
        removeItem,
        updateList
    };

    async function getAllLists(userId) {
        return data.getAllLists(userId);
    }

    async function getList(userId, listId) {
        return data.getListById(userId, listId);
    }

    async function createNewList(userId, name) {
        if (!name || name.trim() === '') throw Errors.INVALID_PARAMETER('name', 'List name cannot be empty');
        return data.createList(userId, name.trim());
    }

    async function removeList(userId, listId) {
        return data.deleteList(userId, listId);
    }

    async function addItemToList(userId, listId, name, quantity) {
        if (!name || name.trim() === '') throw Errors.INVALID_PARAMETER('name', 'Item name cannot be empty');
        if (!quantity || Number(quantity) <= 0) throw Errors.INVALID_PARAMETER('quantity', 'Quantity must be greater than 0');
        return data.addItem(userId, listId, { name: name.trim(), quantity: Number(quantity) });
    }

    async function toggleItem(userId, listId, itemId) {
        return data.toggleBought(userId, listId, itemId);
    }

    async function removeItem(userId, listId, itemId) {
        return data.deleteItem(userId, listId, itemId);
    }

    async function updateList(userId, listId, patch) {
        const name = patch?.name?.trim();
        if (!name) throw Errors.INVALID_PARAMETER('name', 'List name cannot be empty');
        return data.updateList(userId, listId, { name });
    }
}
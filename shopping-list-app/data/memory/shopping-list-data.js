import Errors from '../../errors.js';

const userLists = {
    1: [
        {
            id: 1,
            name: 'Grocery Shopping',
            items: [
                { id: 1, name: 'Milk', quantity: 2, bought: false },
                { id: 2, name: 'Bread', quantity: 1, bought: true },
                { id: 3, name: 'Eggs', quantity: 12, bought: false }
            ]
        },
        {
            id: 2,
            name: 'Weekly Meal Prep',
            items: [
                { id: 1, name: 'Chicken Breast', quantity: 2, bought: true },
                { id: 2, name: 'Rice', quantity: 1, bought: false },
                { id: 3, name: 'Vegetables', quantity: 3, bought: false },
                { id: 4, name: 'Olive Oil', quantity: 1, bought: true }
            ]
        },
        {
            id: 3,
            name: 'Office Supplies',
            items: [
                { id: 1, name: 'Printer Paper', quantity: 5, bought: false },
                { id: 2, name: 'Pens', quantity: 10, bought: true },
                { id: 3, name: 'Notepads', quantity: 2, bought: false }
            ]
        }
    ],
    2: [
        {
            id: 1,
            name: 'Hardware Store',
            items: [
                { id: 1, name: 'Hammer', quantity: 1, bought: false },
                { id: 2, name: 'Nails', quantity: 100, bought: true }
            ]
        },
        {
            id: 2,
            name: 'Home Improvement',
            items: [
                { id: 1, name: 'Paint', quantity: 2, bought: false },
                { id: 2, name: 'Brushes', quantity: 3, bought: true },
                { id: 3, name: 'Screws', quantity: 50, bought: false }
            ]
        },
        {
            id: 3,
            name: 'Garden Tools',
            items: [
                { id: 1, name: 'Shovel', quantity: 1, bought: true },
                { id: 2, name: 'Rake', quantity: 1, bought: false },
                { id: 3, name: 'Gloves', quantity: 2, bought: true },
                { id: 4, name: 'Seeds', quantity: 4, bought: false }
            ]
        }
    ],
    3: []
};

async function getAllLists(userId) {
    return userLists[userId] || [];
}

async function getListById(userId, listId) {
    const list = (userLists[userId] || []).find(candidate => candidate.id === Number(listId));
    if (!list) throw Errors.LIST_NOT_FOUND(listId);
    return list;
}

async function createList(userId, name) {
    if (!userLists[userId]) userLists[userId] = [];
    const list = { id: Date.now(), name, items: [] };
    userLists[userId].push(list);
    return list;
}

async function updateList(userId, listId, patch) {
    const list = await getListById(userId, listId);
    if (patch?.name) list.name = String(patch.name);
    return list;
}

async function deleteList(userId, listId) {
    const lists = userLists[userId] || [];
    const index = lists.findIndex(list => list.id === Number(listId));
    if (index === -1) throw Errors.LIST_NOT_FOUND(listId);
    lists.splice(index, 1);
    return { success: true };
}

async function addItem(userId, listId, itemData) {
    const list = await getListById(userId, listId);
    const item = { id: Date.now(), name: itemData.name, quantity: itemData.quantity, bought: false };
    list.items.push(item);
    return item;
}

async function toggleBought(userId, listId, itemId) {
    const list = await getListById(userId, listId);
    const item = list.items.find(candidate => candidate.id === Number(itemId));
    if (!item) throw Errors.ITEM_NOT_FOUND(itemId);
    item.bought = !item.bought;
    return item;
}

async function deleteItem(userId, listId, itemId) {
    const list = await getListById(userId, listId);
    const index = list.items.findIndex(item => item.id === Number(itemId));
    if (index === -1) throw Errors.ITEM_NOT_FOUND(itemId);
    list.items.splice(index, 1);
    return { success: true };
}

export { getAllLists, getListById, createList, updateList, deleteList, addItem, toggleBought, deleteItem };
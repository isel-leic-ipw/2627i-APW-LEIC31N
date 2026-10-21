import Errors from '../../errors.js';
import { get, post, del, put } from './fetch-wrapper.js';
import createUriManager from './uri-manager.js';

const uri = createUriManager(process.env.ELASTICSEARCH_INDEX || 'shopping-lists');
let indexReady;

async function ensureIndex() {
    if (!indexReady) {
        indexReady = put(uri.createIndex()).catch(error => {
            if (error.status === 400 && error.body?.error?.type === 'resource_already_exists_exception') return;
            indexReady = undefined;
            throw error;
        });
    }
    return indexReady;
}

async function readList(userId, listId) {
    await ensureIndex();
    let document;
    try {
        document = await get(uri.get(listId));
    } catch (error) {
        if (error.status === 404) throw Errors.LIST_NOT_FOUND(listId);
        throw error;
    }
    if (!document.found || document._source?.userId !== userId) {
        throw Errors.LIST_NOT_FOUND(listId);
    }
    return document._source;
}

function toPublicList({ userId, ...list }) {
    return list;
}

async function saveList(list) {
    await ensureIndex();
    await put(uri.update(list.id), list);
    return list;
}

async function getAllLists(userId) {
    await ensureIndex();
    const result = await post(uri.getAll(), {
        size: 10000,
        query: { term: { userId } }
    });
    return result.hits.hits.map(hit => toPublicList(hit._source));
}

async function getListById(userId, listId) {
    return toPublicList(await readList(userId, listId));
}

async function createList(userId, name) {
    const list = { id: Date.now(), userId, name, items: [] };
    await ensureIndex();
    await put(uri.create(list.id), list);
    return toPublicList(list);
}

async function updateList(userId, listId, patch) {
    const list = await readList(userId, listId);
    if (patch?.name) list.name = String(patch.name);
    await saveList(list);
    return toPublicList(list);
}

async function deleteList(userId, listId) {
    await readList(userId, listId);
    await del(uri.delete(listId));
    return { success: true };
}

async function addItem(userId, listId, itemData) {
    const list = await readList(userId, listId);
    const item = { id: Date.now(), name: itemData.name, quantity: itemData.quantity, bought: false };
    list.items.push(item);
    await saveList(list);
    return item;
}

async function toggleBought(userId, listId, itemId) {
    const list = await readList(userId, listId);
    const item = list.items.find(candidate => candidate.id === Number(itemId));
    if (!item) throw Errors.ITEM_NOT_FOUND(itemId);
    item.bought = !item.bought;
    await saveList(list);
    return item;
}

async function deleteItem(userId, listId, itemId) {
    const list = await readList(userId, listId);
    const index = list.items.findIndex(item => item.id === Number(itemId));
    if (index === -1) throw Errors.ITEM_NOT_FOUND(itemId);
    list.items.splice(index, 1);
    await saveList(list);
    return { success: true };
}

export { getAllLists, getListById, createList, updateList, deleteList, addItem, toggleBought, deleteItem };
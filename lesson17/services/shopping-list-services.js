import { errors } from '../errors/errors.js';

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
        return dataModule.getAllLists(userId, query);
    }

    async function createList(userId, name, description) {
        validateUser(userId);
        if(!name) throw errors.INVALID_PARAM("name", "List name is required");
        return dataModule.createList(userId, name, description);
    }

    async function getList(userId) {
        validateUser(userId);
    }

    async function updateList(userId) {
        validateUser(userId);
    }

    async function deleteList(userId) {
        validateUser(userId);
    }

    async function addListItem(userId) {}

    async function deleteListItem(userId) {}

    async function toggleListItem(userId) {}


    async function validateUser(userId) {
        if (!userId) throw errors.INVALID_USER("User ID is required") 
    }
}
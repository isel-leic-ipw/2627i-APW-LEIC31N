

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

    async function createList(userId) {}

    async function getList(userId) {}

    async function updateList(userId) {}

    async function deleteList(userId) {}

    async function addListItem(userId) {}

    async function deleteListItem(userId) {}

    async function toggleListItem(userId) {}
}
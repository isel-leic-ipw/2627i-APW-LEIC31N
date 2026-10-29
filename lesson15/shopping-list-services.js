

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

    async function getAllLists(query) {
        return dataModule.getAllLists(query);
    }

    async function createList() {}

    async function getList() {}

    async function updateList() {}

    async function deleteList() {}

    async function addListItem() {}

    async function deleteListItem() {}

    async function toggleListItem() {}
}
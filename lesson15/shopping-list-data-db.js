export async function getAllLists() {
    return Promise.resolve([{
        name: "Sample List",
        description: "This is a sample list"
    }, {
        name: "Another List",
        description: "This is another sample list"  
    }])
}

export async function createList() {}

export async function getList() {}

export async function updateList() {}

export async function deleteList() {}

export async function addListItem() {}

export async function deleteListItem() {}

export async function toggleListItem() {}
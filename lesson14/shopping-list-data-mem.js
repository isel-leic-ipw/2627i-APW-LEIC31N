const lists = {
    user1: [{
        id: 1,
        name: "Sample List",
        description: "This is a sample list"
    }, {
        id: 2,
        name: "Another List",
        description: "This is another sample list"  
    }],
    user2: [{
        id: 3,
        name: "Sample List",
        description: "This is a sample list"
    }, {
        id: 4,
        name: "Another List",
        description: "This is another sample list"  
    }]
}


let nextId = 5

export async function getAllLists(userId) {
    return Promise.resolve(lists[userId])
}

export async function createList(name, description) {
    const newList = {
        id: nextId++,
        name,
        description
    }
    lists.push(newList)
    return Promise.resolve(newList)
}

export async function getList(id) {
    const list = lists.find(l => l.id === id)
    return Promise.resolve(list)
}

export async function updateList() {}

export async function deleteList() {}

export async function addListItem() {}

export async function deleteListItem() {}

export async function toggleListItem() {}
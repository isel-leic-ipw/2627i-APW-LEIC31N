const listsByUser = {
    1: [
        {
            id: 1,
            name: 'Weekly groceries',
            description: 'Food and household items',
            items: [{ id: 1, name: 'Apples', quantity: 4, bought: false }]
        },
        {
            id: 2,
            name: 'Home supplies',
            description: 'Cleaning and household supplies',
            items: [{ id: 2, name: 'Detergent', quantity: 1, bought: false }]
        },
        {
            id: 3,
            name: 'Study materials',
            description: 'Materials for the semester',
            items: [{ id: 3, name: 'Notebook', quantity: 2, bought: false }]
        }
    ],
    2: [
        {
            id: 4,
            name: 'Coffee break',
            description: 'Coffee and snacks',
            items: [{ id: 4, name: 'Coffee', quantity: 1, bought: false }]
        },
        {
            id: 5,
            name: 'Picnic',
            description: 'Food for the weekend',
            items: [{ id: 5, name: 'Bread', quantity: 2, bought: false }]
        }
    ]
}
let nextListId = 6
let nextItemId = 6

function listsForUser(userId) {
    if (!listsByUser[userId]) listsByUser[userId] = []
    return listsByUser[userId]
}

export async function getAllLists(userId, query) {
    const lists = listsForUser(userId)
    if (!query) return lists
    const normalizedQuery = query.toLowerCase()
    return lists.filter(list => `${list.name} ${list.description ?? ''}`.toLowerCase().includes(normalizedQuery))
}

export async function createList(userId, name, description) {
    const list = { id: nextListId++, name, description, items: [] }
    listsForUser(userId).push(list)
    return list
}

export async function getList(userId, listId) {
    return listsForUser(userId).find(list => list.id === listId)
}

export async function updateList(userId, listId, name, description) {
    return getList(userId, listId).then(list => {
        if (!list) return undefined
        list.name = name
        list.description = description
        return list
    })
}

export async function deleteList(userId, listId) {
    const lists = listsForUser(userId)
    const index = lists.findIndex(list => list.id === listId)
    if (index < 0) return false
    lists.splice(index, 1)
    return true
}

export async function addListItem(userId, listId, name, quantity) {
    return getList(userId, listId).then(list => {
        if (!list) return undefined
        const item = { id: nextItemId++, name, quantity, bought: false }
        list.items.push(item)
        return item
    })
}

export async function deleteListItem(userId, listId, itemId) {
    const lists = listsForUser(userId)
    const list = lists.find(candidate => candidate.id === listId)
    if (!list) return false
    const index = list.items.findIndex(item => item.id === itemId)
    if (index < 0) return false
    list.items.splice(index, 1)
    return true
}

export async function toggleListItem(userId, listId, itemId) {
    return getList(userId, listId).then(list => {
        const item = list?.items.find(candidate => candidate.id === itemId)
        if (!item) return undefined
        item.bought = !item.bought
        return item
    })
}
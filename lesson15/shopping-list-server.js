import express from 'express';
import createShoppingListServices from './services/shopping-list-services.js';
import createUserServices from './services/user-services.js';
import createShoppingListWebApi from './web/shopping-list-web-api.js';
import createUsersWebApi from './web/users-web-api.js';
import * as shoppingListData from './data/shopping-list-data-mem.js';
import * as usersData from './data/users-data.js';

const shoppingListServices = createShoppingListServices(shoppingListData)
const userServices = createUserServices(usersData)
const shoppingListWebApi = createShoppingListWebApi(shoppingListServices)     
const usersWebApi = createUsersWebApi(userServices)

const app = express()

const port = 1904

//app.get('/', home)

const RESOURCES = {
  USERS: '/users',
  LISTS: '/lists',
  LIST: '/lists/:listId',
  LIST_ITEMS: '/lists/:listId/items',
  LIST_ITEM: '/lists/:listId/items/:itemId',
  LIST_ITEM_TOGGLE: '/lists/:listId/items/:itemId/toggle'
}

//app.use(myMiddleware)
app.use(RESOURCES.LISTS,express.json())
app.use(usersWebApi.tokenValidator)

app.post(RESOURCES.USERS, usersWebApi.createUser)

app.get(RESOURCES.LISTS, shoppingListWebApi.getLists)
app.post(RESOURCES.LISTS, shoppingListWebApi.createList)

app.get(RESOURCES.LIST, shoppingListWebApi.getList)
app.put(RESOURCES.LIST, shoppingListWebApi.updateList)
app.delete(RESOURCES.LIST, shoppingListWebApi.deleteList)

app.post(RESOURCES.LIST_ITEMS, shoppingListWebApi.addListItem)

app.delete(RESOURCES.LIST_ITEM, shoppingListWebApi.deleteListItem)

app.post(RESOURCES.LIST_ITEM_TOGGLE, shoppingListWebApi.toggleListItem)





app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err)
        return
    }
    console.log(`Example app listening on port ${port}`)
})
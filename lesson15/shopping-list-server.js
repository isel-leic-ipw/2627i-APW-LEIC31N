import express from 'express';
import createShoppingListServices from './shopping-list-services.js'; 
import createShoppingListWebApi from './shopping-list-web-api.js';
import shoppingListData from './shopping-list-data-mem.js';

const shoppingListServices = createShoppingListServices(shoppingListData)
const shoppingListWebApi = createShoppingListWebApi(shoppingListServices)     

const app = express()

const port = 1904

//app.get('/', home)

const RESOURCES = {
  LISTS: '/lists',
  LIST: '/lists/:listId',
  LIST_ITEMS: '/lists/:listId/items',
  LIST_ITEM: '/lists/:listId/items/:itemId',
  LIST_ITEM_TOGGLE: '/lists/:listId/items/:itemId/toggle'
}

//app.use(myMiddleware)
app.use(express.json())

app.get(RESOURCES.LISTS, shoppingListWebApi.getLists)
app.post(RESOURCES.LISTS, shoppingListWebApi.createList)

app.get(RESOURCES.LIST, shoppingListWebApi.getList)
app.put(RESOURCES.LIST, shoppingListWebApi.updateList)
app.delete(RESOURCES.LIST, shoppingListWebApi.deleteList)

app.post(RESOURCES.LIST_ITEMS, shoppingListWebApi.addListItem)

app.delete(RESOURCES.LIST_ITEM, shoppingListWebApi.deleteListItem)

app.post(RESOURCES.LIST_ITEM_TOGGLE, shoppingListWebApi.toggleListItem)



function myMiddleware(req, rsp, next) {
  console.log("Dummy middleware")
  next()

}

function home(req, res) {
}


app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err)
        return
    }
    console.log(`Example app listening on port ${port}`)
})
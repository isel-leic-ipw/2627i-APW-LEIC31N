import express from 'express';
import { getLists, createList, getList, updateList, deleteList, addListItem, deleteListItem, toggleListItem } from './api.js';

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

app.get(RESOURCES.LISTS, getLists)
app.post(RESOURCES.LISTS, createList)

app.get(RESOURCES.LIST, getList)
app.put(RESOURCES.LIST, updateList)
app.delete(RESOURCES.LIST, deleteList)

app.post(RESOURCES.LIST_ITEMS, addListItem)

app.delete(RESOURCES.LIST_ITEM, deleteListItem)

app.post(RESOURCES.LIST_ITEM_TOGGLE, toggleListItem)



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
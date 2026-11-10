import express from 'express';  
import { tokenValidator } from './users-web-api.js';

const RESOURCES = {
  LISTS: '/lists',
  LIST: '/lists/:listId',
  LIST_ITEMS: '/lists/:listId/items',
  LIST_ITEM: '/lists/:listId/items/:itemId',
  LIST_ITEM_TOGGLE: '/lists/:listId/items/:itemId/toggle'
}


export default function (services) {
  const router = express.Router()
  router.use(RESOURCES.LISTS, tokenValidator)
  router.get(RESOURCES.LISTS, getLists)
  router.post(RESOURCES.LISTS, createList)

  router.get(RESOURCES.LIST, getList)
  router.put(RESOURCES.LIST, updateList)
  router.delete(RESOURCES.LIST, deleteList)

  router.post(RESOURCES.LIST_ITEMS, addListItem)

  router.delete(RESOURCES.LIST_ITEM, deleteListItem)

  router.post(RESOURCES.LIST_ITEM_TOGGLE, toggleListItem)

  return router


  async function getLists(req, res) {
    return services.getAllLists(req.user.userId, req.query.q)
      .then(lists => res.json(lists))
  }

  async function createList(req, res) {
    const { name, description } = req.body
    return services.createList(req.user.userId, name, description)
      .then(list => res.status(201).json({ list }))
  }

  async function getList(req, res) {
    return services.getList(req.user.userId, Number(req.params.listId))
      .then(list => res.json(list))
  }

  async function updateList(req, res) {
    const { name, description } = req.body ?? {}
    return services.updateList(req.user.userId, Number(req.params.listId), name, description)
      .then(list => res.json({ list }))
  }

  async function deleteList(req, res) {
    return services.deleteList(req.user.userId, Number(req.params.listId))
      .then(() => res.json({ status: 'Shopping list deleted' }))
  }

  async function addListItem(req, res) {
    const { name, quantity } = req.body ?? {}
    return services.addListItem(req.user.userId, Number(req.params.listId), name, quantity)
      .then(item => res.status(201).json({ item }))
  }

  async function deleteListItem(req, res) {
    return services.deleteListItem(req.user.userId, Number(req.params.listId), Number(req.params.itemId))
      .then(() => res.json({ status: 'Shopping-list item deleted' }))
  }

  async function toggleListItem(req, res) {
    return services.toggleListItem(req.user.userId, Number(req.params.listId), Number(req.params.itemId))
      .then(item => res.json({ item }))
  }
} 



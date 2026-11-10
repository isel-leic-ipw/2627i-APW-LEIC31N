
export default function (services) {
  return { getLists, createList, getList, updateList, deleteList, addListItem, deleteListItem, toggleListItem } 

  async function getLists(req, res) {
    return services.getAllLists(req.user.userId, req.query.q)
      .then(lists => res.json(lists))
  }

  async function createList(req, res) {
    const { name, description } = req.body ?? {}
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



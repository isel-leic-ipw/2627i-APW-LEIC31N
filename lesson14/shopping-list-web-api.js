
export default function (services) {
  return { getLists, createList, getList, updateList, deleteList, addListItem, deleteListItem, toggleListItem } 

  async function getLists(req, res) {
    console.log(req.uri)
    const lists = await shoppingListServices.getAllLists(req.query.q)

    res.json(lists)
    // res.set("Content-Type", "application/json")
    // res.send(JSON.stringify(lists))
    //res.send(`Get all lists with query ${req.query.q}`)
  }

  function createList(req, res) {
    console.log("create list called")
    console.log('Content-Type header: ', req.get('Content-Type'))
    let {name, description } = req.body
    // const name = req.body.name
    // const description = req.body.description 
    res.send(`Received request to create a list with name '${name}' and description '${description}' `)
  }

  function getList(req, res) {
    res.send(`Received request to get a list with Id '${req.params.listId}'`)
  }

  function updateList(req, res) {
    console.log("update list called")
    console.log('Content-Type header: ', req.get('Content-Type'))
    let { name, description } = req.body
    res.send(`Received request to update list with Id '${req.params.listId}' with name '${name}' and description '${description}' `)
  }

  function deleteList(req, res) {
    res.send(`Received request to delete a list with Id '${req.params.listId}'`)
  }

  function addListItem(req, res) {
    console.log("add list item called")
    console.log('Content-Type header: ', req.get('Content-Type'))
    let { name, quantity } = req.body
    res.send(`Received request to add item '${name}' with quantity '${quantity}' to list with Id '${req.params.listId}' `)
  }

  function deleteListItem(req, res) {
    res.send(`Received request to delete item with Id '${req.params.itemId}' from list with Id '${req.params.listId}'`)
  }

  function toggleListItem(req, res) {
    res.send(`Received request to toggle item with Id '${req.params.itemId}' in list with Id '${req.params.listId}'`)
  }
} 



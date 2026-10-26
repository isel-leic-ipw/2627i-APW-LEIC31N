export function getLists(req, res) {
  console.log(req.uri)
  res.send(`Get all lists with query ${req.query.q}`)
}

export function createList(req, res) {
  console.log("create list called")
  console.log('Content-Type header: ', req.get('Content-Type'))
  let {name, description } = req.body
  // const name = req.body.name
  // const description = req.body.description 
  res.send(`Received request to create a list with name '${name}' and description '${description}' `)
}

export function getList(req, res) {
  res.send(`Received request to get a list with Id '${req.params.listId}'`)
}

export function updateList(req, res) {
  console.log("update list called")
  console.log('Content-Type header: ', req.get('Content-Type'))
  let { name, description } = req.body
  res.send(`Received request to update list with Id '${req.params.listId}' with name '${name}' and description '${description}' `)
}

export function deleteList(req, res) {
  res.send(`Received request to delete a list with Id '${req.params.listId}'`)
}

export function addListItem(req, res) {
  console.log("add list item called")
  console.log('Content-Type header: ', req.get('Content-Type'))
  let { name, quantity } = req.body
  res.send(`Received request to add item '${name}' with quantity '${quantity}' to list with Id '${req.params.listId}' `)
}

export function deleteListItem(req, res) {
  res.send(`Received request to delete item with Id '${req.params.itemId}' from list with Id '${req.params.listId}'`)
}

export function toggleListItem(req, res) {
  res.send(`Received request to toggle item with Id '${req.params.itemId}' in list with Id '${req.params.listId}'`)
}

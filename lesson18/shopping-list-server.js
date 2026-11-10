import express from 'express';
import createShoppingListServices from './services/shopping-list-services.js';
import createUserServices from './services/user-services.js';
import createShoppingListWebApi from './web/shopping-list-web-api.js';
import createUsersWebApi from './web/users-web-api.js';
import * as shoppingListData from './data/shopping-list-data-mem.js';
import * as usersData from './data/users-data.js';
import errorHandler from './web/http-errors.js';

const app = express()

const shoppingListServices = createShoppingListServices(shoppingListData)
const userServices = createUserServices(usersData)
const shoppingListWebApiRouter = createShoppingListWebApi(shoppingListServices, app)     
const usersWebApiRouter = createUsersWebApi(userServices)
errorHandler(app)


const port = 1904

app.use(express.json())

app.use('/api/v1', shoppingListWebApiRouter)
app.use('/api/v1', usersWebApiRouter)


app.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err)
        return
    }
    console.log(`Example app listening on port ${port}`)
})
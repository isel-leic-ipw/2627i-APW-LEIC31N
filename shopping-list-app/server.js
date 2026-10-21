// server.js - Express server setup (final)

import express from 'express';
import { readFileSync } from 'node:fs';
import swaggerUi from 'swagger-ui-express';
import * as memoryListsData from './data/memory/shopping-list-data.js';
import * as memoryUsersData from './data/memory/users-data.js';
import * as elasticListsData from './data/elastic/shopping-list-data.js';
import * as elasticUsersData from './data/elastic/users-data.js';
import createShoppingListServices from './services/shopping-list-services.js';
import createUsersServices from './services/users-services.js';
import createShoppingListApi from './web/api/shopping-list-api.js';
import createShoppingListSite from './web/site/shopping-list-site.js';

const app = express();
const PORT = process.env.PORT || 3000;
const openApiSpec = JSON.parse(readFileSync(new URL('./docs/openapi.json', import.meta.url), 'utf8'));
const dataImplementations = {
    memory: { lists: memoryListsData, users: memoryUsersData },
    elastic: { lists: elasticListsData, users: elasticUsersData }
};
const dataImplementationName = process.env.DATA_STORE || 'memory';
const dataImplementation = dataImplementations[dataImplementationName];

if (!dataImplementation) {
    throw new Error(`Unsupported DATA_STORE "${dataImplementationName}". Use "memory" or "elastic".`);
}

const shoppingListServices = createShoppingListServices(dataImplementation.lists);
const usersServices = createUsersServices(dataImplementation.users);

// Configure Handlebars view engine
app.set('view engine', 'hbs');
app.set('views', './views');

// Middleware
app.use(express.static('public'));
app.get('/api-docs/openapi.json', (req, res) => res.json(openApiSpec));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use('/api', createShoppingListApi(shoppingListServices, usersServices));
app.use('/', createShoppingListSite(shoppingListServices, usersServices));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Test credentials:');
    console.log('  alice / password123');
    console.log('  bob / secret456');
    console.log('  charlie / test789');
});

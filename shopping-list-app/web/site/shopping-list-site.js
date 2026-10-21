import express from 'express';
import { createBasicAuthMiddleware } from '../../auth-middleware.js';

export default function createShoppingListSite(shoppingListServices, usersServices) {
    const router = express.Router();
    router.use(express.urlencoded({ extended: false }));
    router.get('/', handleGetHome);
    router.get('/logout', handleGetLogout);
    router.post('/logout', handleLogout);
    router.use('/lists', createBasicAuthMiddleware(usersServices));
    router.get('/lists', handleGetLists);
    router.get('/lists/create', handleGetCreateList);
    router.get('/lists/:id/edit', handleGetEditList);
    router.get('/lists/:id', handleGetList);
    router.post('/lists/create', handleCreateList);
    router.post('/lists/:id/edit', handleEditList);
    router.post('/lists/:id/delete', handleDeleteList);
    router.post('/lists/:id/items/create', handleAddItem);
    router.post('/lists/:id/items/:itemId/toggle', handleToggleItem);
    router.post('/lists/:id/items/:itemId/delete', handleDeleteItem);
    return router;

async function handleGetHome(req, res) {
    try {
        res.render('home', { user: req.user });
    } catch (err) {
        res.status(500).render('error', { message: 'Error loading home page', status: 500 });
    }
}

async function handleGetLists(req, res) {
    try {
        const lists = await shoppingListServices.getAllLists(req.user.id);
        res.render('lists', { lists, favorites: getFavorites(lists, 2), user: req.user });
    } catch (err) {
        res.status(500).render('error', { message: 'Error loading lists', status: 500 });
    }
}

async function handleGetList(req, res) {
    try {
        const list = await shoppingListServices.getList(req.user.id, req.params.id);
        res.render('list-detail', { list, user: req.user });
    } catch (err) {
        res.status(404).render('error', { message: 'List not found', status: 404 });
    }
}

async function handleGetCreateList(req, res) {
    try {
        res.render('edit-list', { user: req.user, list: null });
    } catch (err) {
        res.status(500).render('error', { message: 'Error loading form', status: 500 });
    }
}

async function handleGetEditList(req, res) {
    try {
        const list = await shoppingListServices.getList(req.user.id, req.params.id);
        res.render('edit-list', { user: req.user, list });
    } catch (err) {
        res.status(404).render('error', { message: 'List not found', status: 404 });
    }
}

async function handleCreateList(req, res) {
    try {
        const { name } = req.body;
        await shoppingListServices.createNewList(req.user.id, name);
        res.redirect('/lists');
    } catch (err) {
        res.status(400).render('error', { message: err.message, status: 400 });
    }
}

async function handleDeleteList(req, res) {
    try {
        await shoppingListServices.removeList(req.user.id, req.params.id);
        res.redirect('/lists');
    } catch (err) {
        res.status(404).render('error', { message: 'List not found', status: 404 });
    }
}

async function handleAddItem(req, res) {
    try {
        const { name, quantity } = req.body;
        await shoppingListServices.addItemToList(req.user.id, req.params.id, name, Number(quantity));
        res.redirect(`/lists/${req.params.id}`);
    } catch (err) {
        res.status(400).render('error', { message: err.message, status: 400 });
    }
}

async function handleToggleItem(req, res) {
    try {
        await shoppingListServices.toggleItem(req.user.id, req.params.id, req.params.itemId);
        res.redirect(`/lists/${req.params.id}`);
    } catch (err) {
        res.status(404).render('error', { message: 'Item not found', status: 404 });
    }
}

async function handleDeleteItem(req, res) {
    try {
        await shoppingListServices.removeItem(req.user.id, req.params.id, req.params.itemId);
        res.redirect(`/lists/${req.params.id}`);
    } catch (err) {
        res.status(404).render('error', { message: 'Item not found', status: 404 });
    }
}

async function handleEditList(req, res) {
    try {
        const { name } = req.body;
        await shoppingListServices.updateList(req.user.id, req.params.id, { name });
        res.redirect(`/lists/${req.params.id}`);
    } catch (err) {
        res.status(400).render('error', { message: err.message, status: 400 });
    }
}

async function handleGetLogout(req, res) {
    res.redirect('/');
}

async function handleLogout(req, res) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Shopping List"');
    res.status(401).send('Logged out. Refresh the page to login again.');
}

function getFavorites(lists, maxFavorites) {
    return lists.sort((a, b) => b.items.length - a.items.length).slice(0, maxFavorites);
}

}
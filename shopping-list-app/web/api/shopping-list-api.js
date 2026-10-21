import express from 'express';
import { createBearerAuthApiMiddleware } from '../../auth-middleware.js';
import mapToHttpError from '../map-to-http-errors.js';

export default function (shoppingListServices, usersServices) {
    const router = express.Router();
    router.use(express.json());
    router.use(createBearerAuthApiMiddleware(usersServices));
    router.get('/lists', handleRequest(getListsInternal));
    router.get('/lists/:id', handleRequest(getListInternal));
    router.post('/lists', handleRequest(createListInternal));
    router.put('/lists/:id', handleRequest(updateListInternal));
    router.delete('/lists/:id', handleRequest(deleteListInternal));
    router.post('/lists/:id/items', handleRequest(addItemInternal));
    router.post('/lists/:id/items/:itemId/toggle', handleRequest(toggleItemInternal));
    router.delete('/lists/:id/items/:itemId', handleRequest(deleteItemInternal));
    return router;

    async function getListsInternal(req) {
        return shoppingListServices.getAllLists(req.user.id);
    }

    async function getListInternal(req) {
        return shoppingListServices.getList(req.user.id, req.params.id);
    }

    async function createListInternal(req, res) {
        const list = await shoppingListServices.createNewList(req.user.id, req.body?.name);
        res.status(201);
        return { list };
    }

    async function updateListInternal(req) {
        const list = await shoppingListServices.updateList(req.user.id, req.params.id, req.body);
        return { list };
    }

    async function deleteListInternal(req) {
        await shoppingListServices.removeList(req.user.id, req.params.id);
        return { status: `List with id ${req.params.id} deleted successfully` };
    }

    async function addItemInternal(req, res) {
        const { name, quantity } = req.body ?? {};
        const item = await shoppingListServices.addItemToList(req.user.id, req.params.id, name, Number(quantity));
        res.status(201);
        return { item };
    }

    async function toggleItemInternal(req) {
        const item = await shoppingListServices.toggleItem(req.user.id, req.params.id, req.params.itemId);
        return { item };
    }

    async function deleteItemInternal(req) {
        await shoppingListServices.removeItem(req.user.id, req.params.id, req.params.itemId);
        return { status: `Item with id ${req.params.itemId} deleted successfully` };
    }

    function handleRequest(handler) {
        return async function (req, res) {
            try {
                const result = await handler(req, res);
                res.json(result);
            } catch (err) {
                const response = mapToHttpError(err);
                res.status(response.status).json(response.error);
            }
        };
    }
}
import express from 'express';  
import errors from '../errors/errors.js';

const RESOURCES = {
  USERS: '/users'
}

let userServices = null;

export default function (usrServices) {
  userServices = usrServices;
  const router = express.Router()

  router.post(RESOURCES.USERS, createUser)

  return router


  async function createUser(req, res) {
    const username = req.body?.username;
    return userServices.createUser(username)
      .then(user => res.status(201).json(user));
  }
}

export async function tokenValidator(req, res, next) {
    if(userServices == null) throw new Error('Module userServices not initialized correctly');

    const authorization = req.get('Authorization') ?? '';
    const match = authorization.match(/^Bearer\s+(.+)$/i);
    if (!match) throw errors.INVALID_USER('A Bearer token is required');

    return userServices.getUserIdFromToken(match[1])
      .then(userId => {
        if (!userId) throw errors.INVALID_USER('The Bearer token is invalid');
        req.user = { userId };
        return next();
      });
  }



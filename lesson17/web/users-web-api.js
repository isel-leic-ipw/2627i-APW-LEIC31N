
import errors from '../errors/errors.js';

export default function (userServices) {
  return { createUser, tokenValidator };

  async function createUser(req, res) {
    const username = req.body?.username;
    return userServices.createUser(username)
      .then(user => res.status(201).json(user));
  }

  async function tokenValidator(req, res, next) {
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
}



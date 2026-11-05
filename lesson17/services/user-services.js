import errors from '../errors/errors.js';

export default function createUserServices(dataModule) {
  if (!dataModule) throw new Error('User data module is required');

  return { createUser, getUserIdFromToken };

  async function createUser(username) {
    if (typeof username !== 'string' || username.trim().length === 0) {
      throw errors.INVALID_PARAM('username', 'A non-empty username is required');
    }
    return dataModule.createUser(username.trim()).then(user => {
      if (!user) throw errors.CONFLICT('Username already exists');
      return user;
    });
  }

  async function getUserIdFromToken(token) {
    return dataModule.getUserIdFromToken(token);
  }
}

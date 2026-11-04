export default function createUserServices(dataModule) {
  if (!dataModule) throw new Error('User data module is required');

  return { createUser, getUserIdFromToken };

  async function createUser(username) {
    if (typeof username !== 'string' || username.trim().length === 0) {
      throw new Error('A non-empty username is required');
    }
    return dataModule.createUser(username);
  }

  async function getUserIdFromToken(token) {
    return dataModule.getUserIdFromToken(token)
  }
}

import { randomUUID } from 'node:crypto';

const users = [];
let nextId = 1;

export async function createUser(username) {
  if (users.some(user => user.username === username)) return null;

  const user = {
    id: nextId++,
    username,
    token: randomUUID()
  };

  users.push(user);
  return user;
}

export async function getUserIdFromToken(token) {
  const user = users.find(user => user.token === token);
  return user ? user.id : null;
}

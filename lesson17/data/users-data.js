import { randomUUID } from 'node:crypto';

const users = [{
  id: 1,
  username: 'user1',
  token: '3209c1b9-50b7-43b6-967b-e0f1ce6ba186'
}, {
  id: 2,
  username: 'user2',
  token: 'a5ce8f72-8c31-4ab2-aec1-2db1ec9e13f4'
}];
let nextId = 3;

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

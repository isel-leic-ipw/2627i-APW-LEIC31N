const users = [
    { id: 1, username: 'alice', password: 'password123', apiToken: '75ea9010-65e4-4fa8-b13c-7c0348b16e12' },
    { id: 2, username: 'bob', password: 'secret456', apiToken: 'a842fc53-e219-45e0-8c52-47944f2fbd30' },
    { id: 3, username: 'charlie', password: 'test789', apiToken: 'd61b3bc1-3679-4981-97cd-cdc736667851' }
];

function removeSecrets(user) {
    const { password, apiToken, ...publicUser } = user;
    return publicUser;
}

async function validateCredentials(username, password) {
    const user = users.find(candidate => candidate.username === username && candidate.password === password);
    if (!user) throw new Error('Invalid credentials');
    return removeSecrets(user);
}

async function validateApiToken(token) {
    const user = users.find(candidate => candidate.apiToken === token);
    if (!user) throw new Error('Invalid API token');
    return removeSecrets(user);
}

export { validateCredentials, validateApiToken };
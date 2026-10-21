import { post, put } from './fetch-wrapper.js';
import createUriManager from './uri-manager.js';

const uri = createUriManager(process.env.ELASTICSEARCH_USERS_INDEX || 'shopping-users');
let indexReady;

async function ensureIndex() {
    if (!indexReady) {
        indexReady = put(uri.createIndex()).catch(error => {
            if (error.status === 400 && error.body?.error?.type === 'resource_already_exists_exception') return;
            indexReady = undefined;
            throw error;
        });
    }
    return indexReady;
}

function createUser(hit) {
    const { password, apiToken, ...user } = hit._source;
    return { id: user.id ?? Number(hit._id), ...user };
}

async function findUser(term) {
    await ensureIndex();
    const filters = Object.entries(term).map(([field, value]) => ({ term: { [`${field}.keyword`]: value } }));
    const result = await post(uri.getAll(), { size: 1, query: { bool: { filter: filters } } });
    const hit = result.hits.hits[0];
    return hit ? createUser(hit) : undefined;
}

async function validateCredentials(username, password) {
    const user = await findUser({ username, password });
    if (!user) throw new Error('Invalid credentials');
    return user;
}

async function validateApiToken(token) {
    const user = await findUser({ apiToken: token });
    if (!user) throw new Error('Invalid API token');
    return user;
}

export { validateCredentials, validateApiToken };
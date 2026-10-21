// auth-middleware.js - Basic Auth

async function getAuthenticatedUser(req, usersServices) {
    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        throw new Error('Authentication required');
    }

    try {
        const base64Credentials = authHeader.slice(6);
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
        const [username, password] = credentials.split(':');
        return await usersServices.validateUser(username, password);
    } catch (err) {
        throw new Error('Invalid credentials');
    }
}

function createBasicAuthMiddleware(usersServices) {
    return async function basicAuthMiddleware(req, res, next) {
    try {
        req.user = await getAuthenticatedUser(req, usersServices);
        next();
    } catch (err) {
        res.status(401).set('WWW-Authenticate', 'Basic realm="Shopping List"').render('error', {
            message: err.message,
            status: 401
        });
    }
    };
}

function createBearerAuthApiMiddleware(usersServices) {
    return async function bearerAuthApiMiddleware(req, res, next) {
    const authHeader = req.get('Authorization');
    const match = authHeader?.match(/^Bearer\s+(\S+)$/i);
    if (!match) {
        return res.status(401).set('WWW-Authenticate', 'Bearer').json({ message: 'Bearer token required' });
    }

    try {
        req.user = await usersServices.validateApiToken(match[1]);
        next();
    } catch (err) {
        res.status(401).set('WWW-Authenticate', 'Bearer').json({ message: 'Invalid Bearer token' });
    }
    };
}

export { createBasicAuthMiddleware, createBearerAuthApiMiddleware };

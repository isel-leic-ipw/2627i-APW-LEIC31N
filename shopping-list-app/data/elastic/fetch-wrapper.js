async function get(uri) {
    return fetchInternal(uri);
}

async function del(uri) {
    return fetchInternal(uri, { method: 'DELETE' });
}

async function put(uri, body) {
    return fetchInternal(uri, { method: 'PUT' }, body);
}

async function post(uri, body) {
    return fetchInternal(uri, { method: 'POST' }, body);
}

async function fetchInternal(uri, options = {}, body) {
    const headers = { ...options.headers };
    if (body !== undefined) {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }
    if (process.env.ELASTICSEARCH_API_KEY) {
        headers.Authorization = `ApiKey ${process.env.ELASTICSEARCH_API_KEY}`;
    }

    const response = await fetch(uri, { ...options, headers });
    const responseBody = await response.json().catch(() => ({}));
    if (!response.ok) {
        const error = new Error(`Elasticsearch request failed (${response.status})`);
        error.status = response.status;
        error.body = responseBody;
        throw error;
    }
    return responseBody;
}

export { get, del, put, post };
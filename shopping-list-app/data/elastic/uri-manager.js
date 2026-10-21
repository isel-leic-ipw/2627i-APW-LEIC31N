const endpoint = (process.env.ELASTICSEARCH_URL || 'http://localhost:9200').replace(/\/$/, '');

export default function createUriManager(indexName) {
    const indexUrl = `${endpoint}/${encodeURIComponent(indexName)}`;

    return {
        createIndex: () => indexUrl,
        getAll: () => `${indexUrl}/_search`,
        get: id => `${indexUrl}/_doc/${encodeURIComponent(id)}`,
        create: id => `${indexUrl}/_doc/${encodeURIComponent(id)}?refresh=wait_for`,
        update: id => `${indexUrl}/_doc/${encodeURIComponent(id)}?refresh=wait_for`,
        delete: id => `${indexUrl}/_doc/${encodeURIComponent(id)}?refresh=wait_for`
    };
}
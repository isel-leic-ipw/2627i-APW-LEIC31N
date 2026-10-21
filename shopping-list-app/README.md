# Shopping List App — Final

This `final` folder contains a runnable version of the Shopping List application assembled from the session skeletons.

Run locally:

1. cd into the folder:

```bash
cd project/shopping-list-app-skeleton/final
```

2. Install dependencies and run:

```bash
npm install
npm start
```

3. Open `http://localhost:3000` in your browser.

Test credentials (Basic Auth when accessing protected pages):
- alice / password123
- bob / secret456
- charlie / test789

API authentication (Bearer token):
- alice: `75ea9010-65e4-4fa8-b13c-7c0348b16e12`
- bob: `a842fc53-e219-45e0-8c52-47944f2fbd30`
- charlie: `d61b3bc1-3679-4981-97cd-cdc736667851`

Send API requests under `/api` with the `Authorization: Bearer <token>` header.

Notes:
- The default `DATA_STORE=memory` implementation uses in-memory data, which does not persist between restarts.
- Set `DATA_STORE=elastic` to use Elasticsearch for both users and lists. Configure `ELASTICSEARCH_URL` (default `http://localhost:9200`), optional `ELASTICSEARCH_API_KEY`, `ELASTICSEARCH_INDEX` (default `shopping-lists`), and `ELASTICSEARCH_USERS_INDEX` (default `shopping-users`). List documents are created automatically. The users index must contain documents with `id`, `username`, `password`, and `apiToken`; the user adapter searches their `.keyword` fields. For example:

```bash
curl -X PUT http://localhost:9200/shopping-users/_doc/1 \
	-H 'Content-Type: application/json' \
	-d '{"id":1,"username":"alice","password":"password123","apiToken":"75ea9010-65e4-4fa8-b13c-7c0348b16e12"}'
```

Create corresponding documents for the other users before using their credentials.
- The UI uses Bootstrap CDN; no build step required.

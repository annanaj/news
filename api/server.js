import http from 'http';

let users = [
	{ id: 1, name: 'Vlasta' },
	{ id: 2, name: 'Květa' },
	{ id: 3, name: 'Fefík' },
];

const port = 3001;

const server = http.createServer((req, res) => {
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// Handle preflight requests
	if (req.method === 'OPTIONS') {
		res.writeHead(204); // No Content
		res.end();
		return;
	}

	if (req.url === '/users' && req.method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(users));
	} else if (req.url === '/users' && req.method === 'POST') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString(); // Convert buffer to string
		});

		req.on('end', () => {
			const newUser = JSON.parse(body);
			newUser.id = users.length + 1; // Assign a new ID to the user
			users.push(newUser);

			res.writeHead(201, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(newUser)); // Send back the new user
		});
	} else if (req.url?.startsWith('/users/') && req.method === 'DELETE') {
		const userId = parseInt(req.url.split('/')[2]);
		users = users.filter((user) => user.id !== userId);
		res.writeHead(204); // No Content
		res.end();
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
	}
});

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

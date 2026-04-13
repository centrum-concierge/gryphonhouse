const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_ROUTE = '/gryphonhouse';
const STATIC_DIR = path.join(__dirname, 'landing_page');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  const url = req.url.split('?')[0];

  if (url === BASE_ROUTE || url === BASE_ROUTE + '/') {
    serveFile(path.join(STATIC_DIR, 'index.html'), res);
  } else if (url.startsWith(BASE_ROUTE + '/')) {
    const file = url.slice(BASE_ROUTE.length + 1);
    serveFile(path.join(STATIC_DIR, file), res);
  } else {
    res.writeHead(302, { Location: BASE_ROUTE });
    res.end();
  }
}).listen(3001, () => {
  console.log('Server running at http://localhost:3001/gryphonhouse');
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(data);
    }
  });
}

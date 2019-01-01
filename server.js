// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const photos = require('./api/photos');
const cycling = require('./api/cycling');
const content = require('./api/content');

const handleJsonResponse = (res) => (r) => {
  res.writeHead(200, {
    'Content-Type': 'text/json',
    'Access-Control-Allow-Origin': '*',
    'X-Powered-By': 'nodejs',
  });
  res.write(JSON.stringify(r));
  res.end();
};

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    const handleJson = handleJsonResponse(res);

    if (pathname === '/favicon.ico') {
      app.serveStatic(req, res, path.join(__dirname, 'static', pathname));
    } else if (pathname === '/api/photos') {
      photos(req, res);
    } else if (pathname === '/api/cycling') {
      cycling(req, res);
    } else if (pathname === '/api/content') {
      content(req, res);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

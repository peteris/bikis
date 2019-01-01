// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const favicon = require('serve-favicon');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const {
  fetchInstagramPhotos,
  fetchStravaData,
  fetchContentfulData,
} = require('./src/server/api.js');

// Dead simple API functionality
// app.get('/api/photos', fetchInstagramPhotos);
// app.get('/api/cycling', fetchStravaData);
// app.get('/api/content', fetchContentfulData);

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
      fetchInstagramPhotos().then(handleJson);
    } else if (pathname === '/api/cycling') {
      fetchStravaData().then(handleJson);
    } else if (pathname === '/api/content') {
      fetchContentfulData().then(handleJson);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

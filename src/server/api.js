import path from 'path';
import fs from 'fs';

export const handleJsonResponse = (res) => (r) => {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'X-Powered-By': 'nodejs',
  });
  res.write(JSON.stringify(r));
  res.end();
};

export function fetchInstagramPhotos() {
  const photos = [
    '/instagram/01.jpg',
    '/instagram/02.jpg',
    '/instagram/03.jpg',
    '/instagram/04.jpg',
    '/instagram/05.jpg',
    '/instagram/06.jpg',
  ];

  return Promise.resolve(photos);
}

export function fetchStravaData() {
  const dataPath = path.join(process.cwd(), 'data', 'cycling.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return Promise.resolve(data);
}

export function fetchContentfulData() {
  const dataPath = path.join(process.cwd(), 'data', 'content.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return Promise.resolve(data);
}

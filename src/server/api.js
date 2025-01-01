import fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

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

export function fetchStravaData(req, res, next) {
  const api = 'https://www.strava.com/api/v3/athlete/activities';
  const { STRAVA_ACCESS_TOKEN } = process.env;
  const url = `${api}?access_token=${STRAVA_ACCESS_TOKEN}`;

  return fetch(url)
    .then((response) => response.json())
    .then(([{ name, distance, start_date: date }]) => ({
      name,
      distance: (distance * 0.001).toFixed(2),
      date,
    }));
}

export function fetchContentfulData() {
  const content = require('../../data/content.json');
  return Promise.resolve(content);
}

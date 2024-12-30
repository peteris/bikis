const fetch = require('isomorphic-fetch');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const handleJsonResponse = (res) => (r) => {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'X-Powered-By': 'nodejs',
  });
  res.write(JSON.stringify(r));
  res.end();
};

function fetchInstagramPhotos() {
  const { IG_ACCESS_TOKEN } = process.env;
  const api = 'https://api.instagram.com/v1/users/self/media/recent';
  const url = `${api}?access_token=${IG_ACCESS_TOKEN}`;

  return fetch(url)
    .then((response) => response.json())
    .then(({ data }) =>
      data.map(
        ({
          images: {
            standard_resolution: { url },
          },
        }) => url
      )
    );
}

function fetchStravaData(req, res, next) {
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

function fetchContentfulData() {
  // Import static data
  const content = require('../../data/content.json');

  // Return a promise that resolves to the content
  return Promise.resolve(content);
}

module.exports = {
  handleJsonResponse,
  fetchInstagramPhotos,
  fetchStravaData,
  fetchContentfulData,
};

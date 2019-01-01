const fetch = require('isomorphic-fetch');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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
  const {
    CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENTRY_ID,
  } = process.env;
  const url = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/entries/${CONTENTFUL_ENTRY_ID}?access_token=${CONTENTFUL_ACCESS_TOKEN}`;

  return fetch(url)
    .then((response) => response.json())
    .then(({ fields }) => fields);
}

module.exports = {
  fetchInstagramPhotos,
  fetchStravaData,
  fetchContentfulData,
};

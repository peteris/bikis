const { fetchStravaData, handleJsonResponse } = require('./../src/server/api');

module.exports = (req, res) => {
  fetchStravaData().then(handleJsonResponse(res));
};

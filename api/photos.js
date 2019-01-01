const {
  fetchInstagramPhotos,
  handleJsonResponse,
} = require('./../src/server/api');

module.exports = (req, res) => {
  fetchInstagramPhotos().then(handleJsonResponse(res));
};

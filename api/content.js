const {
  fetchContentfulData,
  handleJsonResponse,
} = require('./../src/server/api');

module.exports = (req, res) => {
  fetchContentfulData().then(handleJsonResponse(res));
};

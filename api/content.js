const {
  fetchContentfulData,
  handleJsonResponse,
} = require('./../src/server/api');

module.exports = (_, res) => {
  fetchContentfulData().then(handleJsonResponse(res));
};

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const apiHost = process.env.API_HOST || 'http://peter.is';

const environment = {
  development: {
    isProduction: false,
    apiHost: `http://${host}:${port}`,
  },
  production: {
    isProduction: true,
    apiHost: apiHost,
  },
  test: {
    apiHost: apiHost,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: host,
    port: port,
    app: 'peter.is',
  },
  environment
);

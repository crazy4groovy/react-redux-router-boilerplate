const server = require('./server');

const { port, jsonServer } = require('../client.config.json').baseUrl.test;

server.listen(port || 80, () => {
  console.log(`JSON Server is running: ${jsonServer}:${port}/`); // eslint-disable-line no-console
});

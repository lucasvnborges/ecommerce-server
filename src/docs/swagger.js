const { version } = require('../../package.json');
const config = require('../config/config');

const swagger = {
  openapi: '3.0.0',
  info: {
    title: 'ecommerce-server API documentation',
    version,
    license: {
      name: '',
      url: '',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swagger;

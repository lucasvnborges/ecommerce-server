const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = reuiqre('./config/config');

let server;

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('MongoDB connection on');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

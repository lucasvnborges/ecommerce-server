const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');

const config = require('./config/config');
const morgan = require('./config/morgan');
const routes = require('./routes/v1');
const Error = require('./utils/ErrorApi');
const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// security HTTP headers
app.use(helmet());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// sanitize request data
app.use(xss());
// gzip compression
app.use(compression());

app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/v1', routes);

app.use(({ next }) => {
  next(new Error(httpStatus.NOT_FOUND, 'Content not found'));
});

// convert error to ErrorApi, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;

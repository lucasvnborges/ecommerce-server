const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const Error = require('./utils/ErrorApi');

const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

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

app.use(({ next }) => {
  next(new Error(httpStatus.NOT_FOUND, 'Content not found'));
});

// convert error to ErrorApi, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;

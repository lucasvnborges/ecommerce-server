const express = require('express');
const docsRoutes = require('./docs.routes');
const config = require('../../config/config');

const router = express.Router();

const devRoutes = [
  {
    path: '/docs',
    route: docsRoutes,
  },
];

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

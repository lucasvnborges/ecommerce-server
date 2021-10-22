const express = require('express');
const authRoutes = require('./auth.routes');
const docsRoutes = require('./docs.routes');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

const devRoutes = [
  {
    path: '/docs',
    route: docsRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

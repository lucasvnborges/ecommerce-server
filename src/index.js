const app = require('./app');
const config = require('./config/config');

let server;

server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
});

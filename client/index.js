// eslint-disable-next-line no-global-assign
require = require('esm')(module);
const dotenv = require('../server/src/utility/dotenv');

dotenv.loaddotenv();
module.exports = require('./server.js');

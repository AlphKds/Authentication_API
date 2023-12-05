// config.js

require('dotenv').config();

const dbConfig = {
  MONGO_URI: process.env.MONGO_URI,
};

module.exports = dbConfig;

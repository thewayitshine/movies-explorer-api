require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const config = {
  jwtSecret: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key',
  bitfilmsdb: 'mongodb://0.0.0.0:27017/bitfilmsdb',
};

module.exports = config;

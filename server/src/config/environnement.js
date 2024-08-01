const config = require('./config');

const isProd = config.nodeEnv === 'production';
const isDev = config.nodeEnv === 'development';
const isTest = config.nodeEnv === 'test';

module.exports = {
  isProd,
  isDev,
  isTest,
};

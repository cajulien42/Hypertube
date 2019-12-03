const debug = require('debug')('config');
const dotenv = require('dotenv');
dotenv.config();

const ENV = process.env.NODE_ENV || 'production';
debug(`######## Server environment is ${ENV} ##########`);

if (ENV === 'development') {
  CRON = '*/5 * * * *'; // Every 2 minutes
} else {
  CRON = '0 0 0 * * *'; // Every day at midnight
}

const SERVER = {
  PORT: process.env.PORT || '4000',
};

const DATABASE = {
  HOST: process.env.DATABASE_HOST || 'localhost',
  NAME: process.env.DATABASE_NAME || 'Hypertube',
  OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true },
};

const MAIL = {
  USER: process.env.MAIL_USER,
  PASS: process.env.MAIL_PWD,
};

const JWT = {
  KEY: process.env.JWT_KEY,
};


module.exports = {
  SERVER, DATABASE, MAIL, JWT, ENV, CRON,
};


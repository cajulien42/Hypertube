const debug = require('debug')('config');
const dotenv = require('dotenv');
dotenv.config();

const ENV = process.env.NODE_ENV || 'production';
debug(`######## Server environment is ${ENV} ##########`);

if (ENV === 'development') {
  CRON = {
    MOVIES: '0 0 * * *',
    SHOWS: '30 0 * * *',
    ANIMES: '0 1 * * *',
  };
} else {
  CRON = {
    MOVIES: '0 0 * * *',
    SHOWS: '30 0 * * *',
    ANIMES: '0 1 * * *',
  };
}

const SERVER = {
  PORT: process.env.PORT || '4000',
};

const DATABASE = {
  HOST: process.env.DATABASE_HOST || 'localhost',
  NAME: process.env.DATABASE_NAME || 'Hypertube',
  OPTIONS: { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
};

const MAIL = {
  USER: process.env.MAIL_USER,
  PASS: process.env.MAIL_PWD,
};

const JWT = {
  KEY: process.env.JWT_KEY,
};

const IMDB = {
  KEY: process.env.IMDB_KEY,
};

const TVDB = {
  KEY: process.env.MOVIEDB_KEY,
};

const LIBRARIES = {
  MOVIES: 'movie_library',
  SHOWS: 'show_library',
  ANIMES: 'anime_library',
};

const MAX_RETRY = 2;


module.exports = {
  SERVER, DATABASE, MAIL, JWT, ENV, CRON, LIBRARIES, MAX_RETRY, IMDB, TVDB,
};


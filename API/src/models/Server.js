
const debug = require('debug')('models:server');
const express = require('express');
const cors = require('cors');
const MovieLibraries = require('../routes/MovieLibrary');
const ShowLibraries = require('../routes/ShowLibrary');
const updateMovieLibrary = require('../database/movies/updateLibrary');
const updateShowLibrary = require('../database/shows/updateLibrary');
const error = require('../middleware/error');
const cron = require('node-cron');
const { SERVER, CRON } = require('../config/config');

class Server {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.inUse = { movies: 0, shows: 0, animes: 0 };
    this.app.use('/API/MovieLibrary', MovieLibraries(this.inUse.movies));
    this.app.use('/API/ShowLibrary', ShowLibraries(this.inUse.shows));

    // ** MOVIES UPDATES **
    cron.schedule(CRON.MOVIES, () => {
      debug(`--- In Use: Movie library ${this.inUse.movies} ---`);
      this.inUse.movies = (this.inUse.movies + 1) % 2;
      updateMovieLibrary(this.inUse.movies)
        .then((res) => {
          if (res.success === true) {
            debug(` -- Updated Movie library ${this.inUse.movies} --`);
            this.app.use('/MovieLibrary', MovieLibraries(this.inUse.movies));
            debug(`--- In Use: Movie library ${this.inUse.movies} ---`);
          } else {
            debug('--- An error occurred during update, switching delayed ---');
            this.inUse.movies = (this.inUse.movies + 1) % 2;
          }
        })
        .catch((err) => {
          debug('--- An error occurred during update, switching delayed ---');
          this.inUse.movies = (this.inUse.movies + 1) % 2;
        });
    });

    // ** SHOWS UPDATES **
    cron.schedule(CRON.SHOWS, () => {
      debug(`--- In Use: Show library ${this.inUse.shows} ---`);
      this.inUse.shows = (this.inUse.shows + 1) % 2;
      updateShowLibrary(this.inUse.shows)
        .then((res) => {
          if (res.success === true) {
            debug(` -- Updated Show library ${this.inUse.shows} --`);
            this.app.use('/ShowLibrary', ShowLibraries(this.inUse.shows));
            debug(`--- In Use: Show Library ${this.inUse.shows} ---`);
          } else {
            debug('--- An error occurred during update, switching delayed ---');
            this.inUse.shows = (this.inUse.shows + 1) % 2;
          }
        })
        .catch((err) => {
          debug('--- An error occurred during update, switching delayed ---');
          this.inUse.shows = (this.inUse.shows + 1) % 2;
        });
    });

    this.app.use(error); // after this one should be 404 handler middleware
  }

  listen() {
    this.app.listen(SERVER.PORT, () => debug(`*-- Listening on port ${SERVER.PORT}... --*`));
  }
}

module.exports = Server;

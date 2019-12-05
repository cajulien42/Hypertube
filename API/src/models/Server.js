
const debug = require('debug')('models:server');
const express = require('express');
const cors = require('cors');
const MovieLibraries = require('../routes/MovieLibrary');
// const initLibrary = require('../database/movies/initLibrary');
const updateLibrary = require('../database/movies/updateLibrary');
const error = require('../middleware/error');
const cron = require('node-cron');
const { SERVER, CRON } = require('../config/config');

class Server {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.inUse = 0;
    this.app.use('/MovieLibrary', MovieLibraries[this.inUse]);

    cron.schedule(CRON, () => {
      debug(`--- In Use: library ${this.inUse} ---`);
      this.inUse = (this.inUse + 1) % 2;
      updateLibrary(this.inUse)
        .then((res) => {
          if (res.success === true) {
            debug(` -- Updated library ${this.inUse} --`);
            this.app.use('/MovieLibrary', MovieLibraries[this.inUse]);
            debug(`--- In Use: library ${this.inUse} ---`);
          } else {
            debug('!-- An error occured while updating DB, exiting process --!');
            return process.exit(0);
          }
        })
        .catch((err) => {
          debug(err);
          return process.exit(0);
        });
    });

    this.app.use(error); // after this one should be 404 handler middleware
  }

  listen() {
    this.app.listen(SERVER.PORT, () => debug(`*-- Listening on port ${SERVER.PORT}... --*`));
  }
}

module.exports = Server;

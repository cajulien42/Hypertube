
const debug = require('debug')('index');
const express = require('express');
const cors = require('cors');
const MovieLibraries = require('../routes/MovieLibraries');
const initLibrary = require('../initMovies/initMovieLibrary');
const error = require('../middleware/error');
const cron = require('node-cron');

class Server {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.inUse = 0;
    this.app.use('/MovieLibrary', MovieLibraries[this.inUse]);
    cron.schedule('* * * * *', () => {
      debug(`In Use: library ${this.inUse}`);
      this.inUse = (this.inUse + 1) % 2;
      initLibrary(this.inUse)
        .then((res) => {
          if (res.success === true) {
            debug(`Updated library ${this.inUse}`);
            this.app.use('/MovieLibrary', MovieLibraries[this.inUse]);
            debug(`In Use: library ${this.inUse}`);
          } else {
            debug('An error occured while updating DB, exiting process');
            return process.exit(1);
          }
        })
        .catch((err) => {
          debug(err);
          return process.exit(1);
        });
    });
    this.app.use(error);
  }

  listen() {
    this.app.listen(4000, () => debug(`Listening on port ${4000}...`));
  }
}

module.exports = Server;

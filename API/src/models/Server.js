
const debug = require('debug')('index');
const express = require('express');
const cors = require('cors');
const libraries = require('../routes/library');
const initDb = require('../init/updateLibrary');
const error = require('../middleware/error');
const cron = require('node-cron');

class Server {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.inUse = 0;
    this.app.use('/library', libraries[this.inUse]);
    cron.schedule('* * * * *', () => {
      debug(`In Use: library ${this.inUse}`);
      this.inUse = (this.inUse + 1) % 2;
      initDb(this.inUse)
        .then((res) => {
          if (res.sucess === true) {
            debug(`Updated library ${this.inUse}`);
            this.app.use('/library', libraries[this.inUse]);
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


const debug = require('debug')('index');
const mongoose = require('mongoose');
const Server = require('./src/models/Server');
const initLibrary = require('./src/database/movies/initLibrary');
const updateLibrary = require('./src/database/movies/updateLibrary'); //replace init by update if wanna force resetDB, DEV purpose only
const { DATABASE } = require('./src/config/config');

async function checkDbConnection() {
  mongoose.connect(`mongodb://${DATABASE.HOST}/${DATABASE.NAME}`, DATABASE.OPTIONS, (err) => {
  });
}

checkDbConnection()
  .then(() => updateLibrary(0)) // *here
  .then((res) => {
    if (res.success === true) {
      debug('########### Starting server ############');
      new Server().listen();
    } else return process.exit(1);
  })
  .catch((err) => {
    debug(err);
    return process.exit(1);
  });

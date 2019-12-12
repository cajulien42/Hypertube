
const debug = require('debug')('index');
const mongoose = require('mongoose');
const Server = require('./src/models/Server');
const { init, update } = require('./src/database/start');
const { DATABASE } = require('./src/config/config');

const checkDbConnection = async () => {
  return mongoose.connect(`mongodb://${DATABASE.HOST}/${DATABASE.NAME}`, DATABASE.OPTIONS, (err) => {
    if (err) debug(err);
  });
};


checkDbConnection()
  .then(() => {
    if (process.env.START === 'update') {
      return update();
    } return init();
  })
  .then((res) => {
    if (res[0].success === true && res[1].success === true) {
      debug('######  Starting server #####');
      new Server().listen();
    } else {
      mongoose.connection.close();
      return process.exit(0);
    }
  })
  .catch((err) => {
    debug(err);
    mongoose.connection.close();
    return process.exit(0);
  });

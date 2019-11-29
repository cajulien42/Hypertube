
const debug = require('debug')('index');
const mongoose = require('mongoose');
const Server = require('./src/models/Server');
const initDb = require('./src/init/updateLibrary');

async function checkDbConnection() {
  mongoose.connect('mongodb://localhost/Hypertube', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  });
}

checkDbConnection()
  .then(() => initDb(0))
  .then((res) => {
    if (res.sucess === true) {
      new Server().listen();
    } else return process.exit(1);
  })
  .catch((err) => {
    debug(err);
    return process.exit(1);
  });

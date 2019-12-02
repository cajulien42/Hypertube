
const debug = require('debug')('index');
const mongoose = require('mongoose');
const Server = require('./src/models/Server');
const initLibrary = require('./src/init/initLibrary');
// const updateLibrary = require('./src/init/updateLibrary');

async function checkDbConnection() {
  mongoose.connect('mongodb://localhost/Hypertube', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  });
}

checkDbConnection()
  .then(() => initLibrary(0))
  .then((res) => {
    debug(res);
    if (res.success === true) {
      new Server().listen();
    } else return process.exit(1);
  })
  .catch((err) => {
    debug(err);
    return process.exit(1);
  });

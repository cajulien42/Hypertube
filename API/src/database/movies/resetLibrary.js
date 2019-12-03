const debug = require('debug')('init:resetLibrary');
const mongoose = require('mongoose');
const MovieLibraries = require('../../models/MovieLibrary');
const { DATABASE } = require('../../config/config');

module.exports = (id) => {
  debug('######### Reseting Library ##########');
  return new Promise((resolve) => {
    mongoose.connect(`mongodb://${DATABASE.HOST}/${DATABASE.NAME}`, DATABASE.OPTIONS, () => {
      mongoose.connection.db.listCollections({ name: `library${id}` })
        .next((err, Info) => {
          err !== null ? debug('err:', err): 0;
          if (Info) {
            debug(`-------- Emptying library ${id} ... ---------`);
            MovieLibraries[id].collection.drop();
            resolve();
          } else resolve();
        });
    });
  });
};

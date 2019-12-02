const debug = require('debug')('init:resetLibrary');
const mongoose = require('mongoose');
const MovieLibraries = require('../../models/MovieLibrary');

module.exports = (id) => {
  debug('######## RESETING #######');
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/Hypertube', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
      mongoose.connection.db.listCollections({ name: `library${id}` })
        .next((err, Info) => {
          err !== null ? debug('err:', err): 0;
          if (Info) {
            debug(`######## Emptying library ${id} ... ##########`);
            MovieLibraries[id].collection.drop();
            resolve();
          } else resolve();
        });
    });
  });
};

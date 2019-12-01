const debug = require('debug')('init:resetLibrary');
const mongoose = require('mongoose');
const libraries = require('../models/Library');

module.exports = (id) => {
  debug('######## RESETING #######');
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost/Hypertube', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
      mongoose.connection.db.listCollections({ name: `library${id}` })
        .next((err, Info) => {
          err !== null ? debug('err:', err): 0;
          if (Info) {
            debug(`######## Emptying library ${id} ... ##########`);
            libraries[id].collection.drop();
            resolve();
          } resolve();
        });
    });
  });
};

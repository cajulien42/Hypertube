const debug = require('debug')('init:resetShows');
const ShowLibraries = require('../../models/ShowLibrary');
const { DATABASE, LIBRARIES } = require('../../config/config');

module.exports = (id) => {
  debug(`######### Reseting ${LIBRARIES.SHOWS}${id} ##########`);
  return new Promise((resolve) => {
    ShowLibraries[id].collection.drop()
      .then(() => resolve())
      .catch((err) => resolve());
  });
};

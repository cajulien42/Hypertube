const debug = require('debug')('database:movies:reset');
const MovieLibraries = require('../../models/MovieLibrary');
const { DATABASE, LIBRARIES } = require('../../config/config');

module.exports = (id) => {
  debug(`######### Reseting ${LIBRARIES.MOVIES}${id} ##########`);
  return new Promise((resolve) => {
    MovieLibraries[id].collection.drop()
      .then(() => resolve())
      .catch((err) => resolve());
  });
};

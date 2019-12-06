const debug = require('debug')('init:resetAnimes');
const AnimeLibraries = require('../../models/AnimeLibrary');
const { DATABASE, LIBRARIES } = require('../../config/config');

module.exports = (id) => {
  debug(`######### Reseting ${LIBRARIES.ANIMES}${id} ##########`);
  return new Promise((resolve) => {
    AnimeLibraries[id].collection.drop()
      .then(() => resolve())
      .catch((err) => resolve());
  });
};

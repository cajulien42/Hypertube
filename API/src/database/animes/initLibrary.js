const debug = require('debug')('init:animes');
const populateShows = require('./populateLibrary');
const { LIBRARIES } = require('../../config/config');
const AnimeLibraries = require('../../models/AnimeLibrary');

module.exports = async (id) => {
  return new Promise((resolve, reject) => {
    debug(`######### Checking ${LIBRARIES.ANIMES}${id} ############`);
    AnimeLibraries[id].estimatedDocumentCount({}, (err, count) => {
      if (err === null && count !== 0) {
        debug('--- Anime count: ---', count);
        resolve({ success: true, error: null });
      } else {
        debug('--- Empty Anime Library, populating.... ---');
        resolve(populateShows(id));
      };
    });
  });
};

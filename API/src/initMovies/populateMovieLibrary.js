const debug = require('debug')('init:populateMovies');
const getMovies = require('./getMovies');
const MovieLibraries = require('../models/MovieLibraries');
const _ = require('lodash');


module.exports = async (id) => {
  debug(`########### Populating movieLibrary ${id} ... ###########`);
  const list = await getMovies();
  if (list && list.length) {
    debug('fetched : ', list.length, 'movies');
    const toInsert = _.chunk(list, 100);

    return Promise.all(toInsert.map(async (chunk) => {
      return MovieLibraries[id].insertMany(chunk);
    }))
      .then(() => ({ success: true, error: null }))
      .catch((err) => {
        debug(err);
        return ({ success: false, error: err });
      });
  } else return ({ success: false, error: true });
};

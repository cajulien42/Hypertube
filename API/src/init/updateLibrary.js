const debug = require('debug')('init:updateLibrary');
const libraries = require('../models/Library');
const getMovies = require('./getMovies');
const resetLibrary = require('./resetLibrary');

async function populateMovies(id) {
  debug(`########### Populating library ${id} ... ###########`);
  const list = await getMovies();
  if (list && list.length) {
    debug('fetched : ', list.length, 'movies');
    const movies = { movies: list };
    const res = await libraries[id].create(movies)
      .catch((err) => {
        return ({ success: false, error: err });
      });
    if (res.success === false) {
      return (res);
    } return ({ success: true, error: null });
  } return ({ success: true, error: null });
}

async function updateLibrary(id) {
  return resetLibrary(id)
    .then(() => populateMovies(id))
    .catch((err) => debug(err));
}

module.exports = updateLibrary;

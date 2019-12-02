const debug = require('debug')('init:updateLibrary');
const populateMovies = require('./populateMovieLibrary');
const resetLibrary = require('./resetMovieLibrary');

async function updateLibrary(id) {
  return resetLibrary(id)
    .then(() => populateMovies(id))
    .catch((err) => debug(err));
}

module.exports = updateLibrary;

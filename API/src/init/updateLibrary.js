const debug = require('debug')('init:updateLibrary');
const populateMovies = require('./populateMovies');
const resetLibrary = require('./resetLibrary');

async function updateLibrary(id) {
  return resetLibrary(id)
    .then(() => populateMovies(id))
    .catch((err) => debug(err));
}

module.exports = updateLibrary;

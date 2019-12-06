const debug = require('debug')('database:animes:update');
const populateAnimes = require('./populateLibrary');
const resetLibrary = require('./resetLibrary');

async function updateLibrary(id) {
  return resetLibrary(id)
    .then(() => populateAnimes(id))
    .catch((err) => ({ success: false, err }));
}

module.exports = updateLibrary;


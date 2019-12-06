const debug = require('debug')('init:updateShows');
const populateAnimes = require('./populateLibrary');
const resetLibrary = require('./resetLibrary');

async function updateLibrary(id) {
  return resetLibrary(id)
    .then(() => populateAnimes(id))
    .catch((err) => ({ success: false, err }));
}

module.exports = updateLibrary;

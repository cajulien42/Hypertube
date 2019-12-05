const debug = require('debug')('init:initLibrary');
const populateMovies = require('./populateLibrary');
const mongoose = require('mongoose');

module.exports = async (id) => {
  return new Promise((resolve, reject) => {
    debug(`######### Checking movie_library${id} ############`);
    const query = mongoose.model(`movie_library${id}`).find({});
    query.exec(async (err, docs) => {
      if (docs !== null && docs.length) {
        debug('--- Movie count: ---', docs.length);
        resolve({ success: true, error: null });
      } else {
        debug('--- Empty Library, populating.... ---');
        resolve(populateMovies(id));
      };
    });
  });
};

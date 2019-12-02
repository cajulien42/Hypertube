const debug = require('debug')('init:initLibrary');
const populateMovies = require('./populateMovies');
const mongoose = require('mongoose');

module.exports = async (id) => {
  return new Promise((resolve, reject) => {
    const query = mongoose.model(`library${id}`).find({});
    query.exec(async (err, docs) => {
      if (docs !== null && docs.length && docs[0].movies.length) {
        debug(docs.length);
        debug(docs[0].movies.length);
        debug(`-------- Non Empty --------`);
        resolve({ success: true, error: null });
      } else resolve(populateMovies(id));
    });
  });
};

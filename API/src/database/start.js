const initMovieLibrary = require('./movies/checkLibrary');
const initShowLibrary = require('./shows/checkLibrary');
const updateMovieLibrary = require('./movies/updateLibrary');
const updateShowLibrary = require('./shows/updateLibrary');

module.exports.init = () => {
  return Promise.all([
    initMovieLibrary(0),
    // initShowLibrary(0),
    updateShowLibrary(0),

  ]);
};

module.exports.update = () => {
  return Promise.all([
    updateMovieLibrary(0),
    updateShowLibrary(0),
  ]);
};

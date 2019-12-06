const initMovieLibrary = require('./movies/checkLibrary');
const initShowLibrary = require('./shows/checkLibrary');
const initAnimeLibrary = require('./animes/checkLibrary');
const updateMovieLibrary = require('./movies/updateLibrary');
const updateShowLibrary = require('./shows/updateLibrary');
const updateAnimeLibrary = require('./animes/updateLibrary');

module.exports.init = () => {
  return Promise.all([
    initMovieLibrary(0),
    initShowLibrary(0),
    initAnimeLibrary(0),
  ]);
};

module.exports.update = () => {
  return Promise.all([
    updateMovieLibrary(0),
    updateShowLibrary(0),
    updateAnimeLibrary(0),
  ]);
};

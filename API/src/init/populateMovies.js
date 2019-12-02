const debug = require('debug')('init:populateMovies');
const getMovies = require('./getMovies');
const libraries = require('../models/Library');


module.exports = async (id) => {
  debug(`########### Populating library ${id} ... ###########`);
  const list = await getMovies();
  if (list && list.length) {
    debug('fetched : ', list.length, 'movies');
    // debug('sample:', list[0]);
    const movies = { movies: list };
    const res = await libraries[id].create(movies)
      .catch((err) => {
        return ({ success: false, error: err });
      });
    if (res.success === false) {
      return (res);
    } return ({ success: true, error: null });
  } return ({ success: true, error: null });
};

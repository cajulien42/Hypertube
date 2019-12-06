const debug = require('debug')('database:movies:populate');
const getMovies = require('./getMovies');
const MovieLibraries = require('../../models/MovieLibrary');
const { LIBRARIES } = require('../../config/config');

const _ = require('lodash');


module.exports = async (id) => {
  debug(`######### Populating ${LIBRARIES.MOVIES}${id} ... #########`);
  const list = await getMovies();
  if (list && list.length) {
    debug('---- fetched : ', list.length, 'movies ----');
    const toInsert = _.chunk(list, 100);
    return Promise.all(toInsert.map(async (chunk) => {
      return MovieLibraries[id].insertMany(chunk, { ordered: false });
    }))
      .then(() => ({ success: true, error: null }))
      .catch((err) => {
        return ({ success: true, error: err });
      });
  } else return ({ success: false, error: true });
};

const debug = require('debug')('database:movies:populate');
const getMovies = require('./getMovies');
const MovieLibraries = require('../../models/MovieLibrary');
const { LIBRARIES } = require('../../config/config');
const axios = require('axios');

const _ = require('lodash');

const additionalInfos = async (movies) => {
  const added = movies.map((movie) => {
    return axios.get(`http://www.omdbapi.com/?apikey=82d3dbb5&i=${movie.id}`)
      .then((response) => {
        if (response.status === 200) {
          return { movie, additionalInfos: response.data };
        } return movie;
      })
      .catch((err) => movie);
  });
  return Promise.all(added);
};

module.exports = async (id) => {
  debug(`######### Populating ${LIBRARIES.MOVIES}${id} ... #########`);
  const list = await getMovies();
  if (list && list.length) {
    debug('---- fetched : ', list.length, 'movies ----');
    const tmp = _.chunk(list, 100);
    // const toInsert = [];
    // tmp.reduce(async (prev, next) => {
    //   await prev;
    //   return additionalInfos(next).then((res) => toInsert.push(res));
    // }, setTimeout(() => {
    //   Promise.resolve();
    // }, 100)).then(() => debug(toInsert[0]));
    return Promise.all(tmp.map(async (chunk) => {
      return MovieLibraries[id].insertMany(chunk, { ordered: false });
    }))
      .then(() => ({ success: true, error: null }))
      .catch((err) => {
        return ({ success: true, error: err });
      });
  } else return ({ success: false, error: true });
};

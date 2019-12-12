const debug = require('debug')('database:shows:populate');
const getShows = require('./getShows');
const ShowLibraries = require('../../models/ShowLibrary');
const { LIBRARIES, TVDB } = require('../../config/config');
const axios = require('axios');
const _ = require('lodash');


module.exports = async (id) => {
  debug(`######### Populating ${LIBRARIES.SHOWS}${id} ... #########`);
  const key = TVDB.KEY;
  const tmp = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`);
  const tmp2 = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=2`);
  const tmp3 = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=3`);
  const tmp4 = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=4`);
  // debug('putain', tmp);
  const data = _.concat(tmp.data.results, tmp2.data.results, tmp3.data.results, tmp4.data.results);
  const popular = data.map((elem) => (_.pick(elem, ['original_name', 'popularity'])));
  debug(popular);
  const list = await getShows();

  if (list && list.length) {
    debug('---- fetched : ', list.length, 'shows ----');
    const toInsert = _.chunk(list, 100);
    return Promise.all(
      toInsert.map((page) => {
        return Promise.all(page.map((movie) => {
          return Promise.all(popular.map((popularMovie) => {
            return new Promise((resolve) => {
              if (movie && popularMovie.original_name === movie.title) {
                movie.popularity = popularMovie.popularity;
                debug('----- YOLO ------', movie.title);
                resolve();
              } else resolve();
            });
          }));
        }));
      }))
      .then((res) => {
        return Promise.all(toInsert.map(async (chunk) => {
          return ShowLibraries[id].insertMany(chunk, { ordered: false });
        }))
          .then(() => ({ success: true, error: null }))
          .catch((err) => {
            return ({ success: true, error: err });
          });
      });
  } else return ({ success: false, error: true });
};

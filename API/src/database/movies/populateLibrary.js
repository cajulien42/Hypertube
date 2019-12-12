const debug = require('debug')('database:movies:populate');
const getMovies = require('./getMovies');
const MovieLibraries = require('../../models/MovieLibrary');
const { LIBRARIES, TVDB } = require('../../config/config');
const axios = require('axios');

const _ = require('lodash');

// const additionalInfos = async (movies) => {
//   const added = movies.map((movie) => {
//     return axios.get(`http://www.omdbapi.com/?apikey=82d3dbb5&i=${movie.id}`)
//       .then((response) => {
//         if (response.status === 200) {
//           return { movie, additionalInfos: response.data };
//         } return movie;
//       })
//       .catch((err) => movie);
//   });
//   return Promise.all(added);
// };

module.exports = async (id) => {
  debug(`######### Populating ${LIBRARIES.MOVIES}${id} ... #########`);
  const key = TVDB.KEY;
  const tmp = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`);
  const tmp2 = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`);
  const tmp3 = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=3`);
  const tmp4 = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=4`);
  // debug('putain', tmp.data.results);
  const data = _.concat(tmp.data.results, tmp2.data.results, tmp3.data.results, tmp4.data.results);
  const popularMovies = data.map((elem) => (_.pick(elem, ['original_title', 'popularity'])));
  const list = await getMovies();
  debug(popularMovies);
  if (list && list.length) {
    debug('---- fetched : ', list.length, 'movies ----');
    const toInsert = _.chunk(list, 100);
    return Promise.all(
      toInsert.map((page) => {
        return Promise.all(page.map((movie) => {
          return Promise.all(popularMovies.map((popularMovie) => {
            return new Promise((resolve) => {
              if (movie && popularMovie.original_title === movie.title) {
                movie.popularity = popularMovie.popularity;
                debug('----- Popular film detected: ', movie.title, '------');
                resolve();
              } else resolve();
            });
          }));
        }));
      }))
      .then((res) => {
        return Promise.all(toInsert.map(async (chunk) => {
          return MovieLibraries[id].insertMany(chunk, { ordered: false });
        }))
          .then(() => ({ success: true, error: null }))
          .catch((err) => {
            return ({ success: true, error: err });
          });
      });
  } else return ({ success: false, error: true });
};

// module.exports = async (id) => {
//   debug(`######### Populating ${LIBRARIES.MOVIES}${id} ... #########`);
//   const list = await getMovies();
//   if (list && list.length) {
//     debug('---- fetched : ', list.length, 'movies ----');
//     const tmp = _.chunk(list, 100);

//     return Promise.all(tmp.map(async (chunk) => {
//       return MovieLibraries[id].insertMany(chunk, { ordered: false });
//     }))
//       .then(() => ({ success: true, error: null }))
//       .catch((err) => {
//         return ({ success: true, error: err });
//       });
//   } else return ({ success: false, error: true });
// };

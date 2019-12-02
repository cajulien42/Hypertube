const debug = require('debug')('init:movies');
const axios = require('axios');
const _ = require('lodash');
const checkProxies = require('./checkProxies');

async function getYtsMovies() {
  const status = await checkProxies();
  const proxies = _.filter(status, { up: true });
  debug(proxies);
  const { movieCount } = proxies[0];
  const nbProxies = proxies.length;
  const limit = 50;
  const pages = Math.floor(movieCount / limit) + 1;
  // const operations = Math.floor(pages / nbProxies) + 1; // PROD
  const operations = 2; // DEV
  debug(movieCount, 'movies', pages, 'pages', nbProxies, 'up proxies', operations, 'operations batches needed' );
  const batches = Array.from(Array(operations).keys());
  const movies = [];
  return batches.reduce(async (prev, next) => {
    await prev;
    debug(`########## ${next} batches done ########`);
    return Promise.all(proxies.map((proxy, i) => {
      return new Promise((resolve) => {
        debug(` --- Fetching page ${(next * nbProxies) + i + 1} ---`);
        axios.get(`${proxy.proxy}/v2/list_movies.json?limit=${limit}&page=${(next * nbProxies) + i + 1}`)
          .then((res) => {
            if (res && res.status === 200 && res.data.data && res.data.data !== '' && ((next * nbProxies) + i + 1) <= pages) {
              movies.push(res.data.data.movies);
            } else {
              debug(` !--- error fetching page ${(next * nbProxies) + i + 1}  ---! `);
              movies.push(null);
            } resolve();
          })
          .catch((err) => {
            debug(` !--- error fetching page ${(next * nbProxies) + i + 1}  ---! `);
            movies.push(null); resolve();
          });
      });
    }));
  },
  setTimeout(() => {
    Promise.resolve();
  }, 250))
    .then(() => movies);
}

async function getMovies() {
  const responses = await getYtsMovies();
  const shouldBefetched = responses.length;
  const fetched = _.without(responses, null);
  debug('fetched', fetched.length, 'over', shouldBefetched, 'pages');
  const tmp = [];
  if (fetched && fetched.length) {
    fetched.map((page) => {
      return page.map((movie) => {
        tmp.push({
          id: movie.imdb_code,
          title: movie.title,
          englishTitle: movie.title_english,
          year: movie.year,
          rating: movie.rating,
          runtime: movie.runtime,
          genres: movie.genres,
          synopsis: movie.synopsis,
          language: movie.language,
          smallCover: movie.small_cover_image,
          mediumCover: movie.medium_cover_image,
          largeCover: movie.large_cover_image,
          state: movie.state,
          trailer: `http://youtube.com/watch?v=${movie.yt_trailer_code}`,
          torrents: movie.torrents,
        });
      });
    });
    debug(tmp.length);
  } return tmp;
}

module.exports = getMovies;

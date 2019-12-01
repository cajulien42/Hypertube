const debug = require('debug')('init:movies');
const axios = require('axios');
const _ = require('lodash');

const proxies = [
  'https://ytss.unblocked.is/api',
  'https://ytss.unblocked.ms/api',
  'https://yts.unblocked.llc/api',
  'https://yts.unblocked.vet/api',
  'https://yts.unblocked.gdn/api',
  'http://www.yify-movies.net/api',
  'https://yts.unblocked.pub/api',
  'https://yts.unblocked.team/api',
  'https://yts.bypassed.in/api',
  'https://www4.yify.is/api',
  'http://www.yify-movies.net/api',
  // 'https://yts.ae/api', //unrealiable
  'https://yts.ws/api',
  'https://yts.lt/api',
  'https://yts.am/api',
  'https://yts.gs/api',
  'http://yify.rocks/api',
  'https://yts.sc/api',
  'http://yify.live/api',
  'http://yify.is/api',
  'https://yifymovies.me/api',
  'https://yts-proxy.now.sh',
];

async function checkProxies() {
  debug('###### Checking Proxies ######');
  const promises = proxies.map((proxy) => {
    return new Promise((resolve) => {
      axios.get(`${proxy}/v2/list_movies.json`)
        .then((res) => {
          if (res && res.status === 200 && res.data.data) {
            resolve({ proxy, up: true, movieCount: res.data.data.movie_count });
          } resolve({ proxy, up: false });
        })
        .catch((err) => resolve({ proxy, up: false }));
    });
  });
  return Promise.all(promises);
}

async function getYtsMovies() {
  const status = await checkProxies();
  const proxies = _.filter(status, { up: true });
  debug(proxies);
  const { movieCount } = proxies[0];
  const nbProxies = proxies.length;
  const limit = 50;
  const pages = Math.floor(movieCount / limit) + 1;
  const operations = Math.floor(pages / nbProxies) + 1;
  // const operations = 3;
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
  debug(fetched[0][0]);
  if (fetched && fetched.length) {
    fetched.map((page) => {
      page.map((movie) => {
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
          seen: false,
        });
      });
    });
    debug(tmp.length);
  } return tmp;
}

module.exports = getMovies;

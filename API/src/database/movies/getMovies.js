const debug = require('debug')('init:movies');
const axios = require('axios');
const _ = require('lodash');
const checkProxies = require('./checkYtsProxies');
const { ENV } = require('../../config/config');

const getYtsMovies = async () => {
  const status = await checkProxies();
  const proxies = _.filter(status, { up: true });
  proxies.forEach((proxy) => {
    debug(`---- ${proxy.proxy} : UP ----`);
  });
  const { movieCount } = proxies[0];
  const nbProxies = proxies.length;
  const limit = 50;
  const pages = Math.floor(movieCount / limit) + 1;
  if ( ENV === 'production') {
    operations = Math.floor(pages / nbProxies) + 1;
  } else {
    operations = 2;
  }
  debug('---', movieCount, 'movies', pages, 'pages', nbProxies, 'up proxies', operations, 'operations batches needed ---' );
  const batches = Array.from(Array(operations).keys());
  const movies = [];
  return batches.reduce(async (prev, next) => {
    await prev;
    debug(`########## ${next} batches done ########`);
    return Promise.all(proxies.map((proxy, i) => {
      return new Promise((resolve) => {
        debug(` --- Fetching page ${(next * nbProxies) + i + 1} ---`);
        axios.get(`${proxy.proxy}/v2/list_movies.json?sort_by=like_count&order_by=desc&limit=${limit}&page=${(next * nbProxies) + i + 1}`)
          .then((res) => {
            if (res && res.status === 200 && res.data.data && res.data.data !== '' && ((next * nbProxies) + i + 1) <= pages) {
              movies.push(res.data.data.movies);
            } else {
              debug(` !--- error fetching page ${(next * nbProxies) + i + 1}  ---! `);
              movies.push([{ lost: (next * nbProxies) + i + 1 }]);
            } resolve();
          })
          .catch((err) => {
            debug(` !--- error fetching page ${(next * nbProxies) + i + 1}  ---! `);
            movies.push([{ lost: (next * nbProxies) + i + 1 }]); resolve();
          });
      });
    }));
  },
  setTimeout(() => {
    Promise.resolve();
  }, 250))
    .then(() => movies);
};

const recoverLostPages = async (lostPages) => {
  const limit= 50;
  const status = await checkProxies();
  const proxies = _.filter(status, { up: true });
  proxies.forEach((proxy) => {
    debug(`---- ${proxy.proxy} : UP ----`);
  });
  const pages = lostPages.length;
  const nbProxies = proxies.length;
  const operations = Math.floor(pages / nbProxies) + 1;
  const batches = _.chunk(lostPages, nbProxies);
  const movies = [];
  return batches.reduce(async (prev, next, i) => {
    await prev;
    debug(next);
    debug(`########## ${i} batches done ########`);
    return Promise.all(next.map((batch, i) => {
      debug(batch);
      return new Promise((resolve) => {
        debug(` --- Fetching page ${batch[0].lost} ---`);
        axios.get(`${proxies[i].proxy}/v2/list_movies.json?sort_by=like_count&order_by=desc&limit=${limit}&page=${batch[0].lost}`)
          .then((res) => {
            if (res && res.status === 200 && res.data.data && res.data.data !== '') {
              movies.push(res.data.data.movies);
            } else {
              debug(` !--- error fetching page ${batch[0].lost}  ---! `);
              movies.push([{ lost: batch[0].lost }]);
            } resolve();
          })
          .catch((err) => {
            debug(` !--- error fetching page ${batch[0].lost}  ---! `);
            movies.push([{ lost: batch[i].lost }]); resolve();
          });
      });
    }));
  },
  setTimeout(() => {
    Promise.resolve();
  }, 250))
    .then(() => movies);
};

const getMovies = async () => {
  const responses = await getYtsMovies();
  const shouldBefetched = responses.length;
  const pages = _.filter(responses, (page) => { if (page[0].id) return true; });
  const lostPages = _.filter(responses, (page) => { if (page[0].lost) return true; });
  if (lostPages.length) {
    recovered = await recoverLostPages(lostPages);
  } else recovered = [];
  fetched = _.concat(pages, recovered);
  debug('--- fetched', fetched.length, 'over', shouldBefetched, 'pages ---');
  const tmp = [];
  if (fetched && fetched.length) {
    fetched.map((page, index) => {
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
          popularity: index,
        });
      });
    });
    debug('---', tmp.length, 'movies fetched ---');
  } return tmp;
};

module.exports = getMovies;

const debug = require('debug')('init:getAnimes');
const axios = require('axios');

getShows = async () => {
  debug('--- Fetching animes ---');
  return axios('https://tv-v2.api-fetch.website/exports/anime')
    .then((res) => {
      debug(res.status);
      if (res.status && res.data) {
        const list = res.data.split('\n');
        debug('list length:', list.length);
        const animes = list.map((anime, i) => {
          if (i !== list.length - 1 ) {
            const tmp = JSON.parse(anime);
            return {
              id: tmp._id,
              title: tmp.title,
              year: tmp.year,
              synopsis: tmp.synopsis,
              runtime: tmp.runtime,
              seasons: tmp.num_seasons,
              episodes: tmp.episodes,
              genres: tmp.genres,
              images: tmp.images,
              rating: tmp.rating,
              source: 'Popcorn',
            };
          }
        });
        return animes;
      }
    })
    .catch((err) => { debug(err); return []; });
};

module.exports = getShows;

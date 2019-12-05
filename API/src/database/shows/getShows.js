const debug = require('debug')('init:getShows');
const axios = require('axios');

getShows = async () => {
  debug('--- Fetching Shows ---');
  return axios('https://tv-v2.api-fetch.website/exports/show')
    .then((res) => {
      debug(res.status);
      if (res.status && res.data) {
        const list = res.data.split('\n');
        debug('list length:', list.length);
        const shows = list.map((show, i) => {
          if (i !== list.length - 1 ) {
            debug(i);
            const tmp = JSON.parse(show);
            return {
              id: tmp.imdb_id,
              tvId: tmp.tvdb_id,
              

            };
          }
        });
        debug('sample:', shows[0]);
        return shows;
      }
    })
    .catch((err) => { debug(err); return []; });
};

module.exports = getShows;

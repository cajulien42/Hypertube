const debug = require('debug')('init:populateAnimes');
const getAnimes = require('./getAnimes');
const AnimeLibraries = require('../../models/AnimeLibrary');
const { LIBRARIES } = require('../../config/config');

const _ = require('lodash');


module.exports = async (id) => {
  debug(`######### Populating ${LIBRARIES.ANIMES}${id} ... #########`);
  const list = await getAnimes();
  if (list && list.length) {
    debug('---- fetched : ', list.length, 'animes ----');
    debug('anime sample: ', list[0]);
    const toInsert = _.chunk(list, 100);
    return Promise.all(toInsert.map(async (chunk) => {
      return AnimeLibraries[id].insertMany(chunk, { ordered: false });
    }))
      .then(() => ({ success: true, error: null }))
      .catch((err) => {
        return ({ success: true, error: err });
      });
  } else return ({ success: false, error: true });
};

const debug = require('debug')('init:populateShows');
const getShows = require('./getShows');
const ShowLibraries = require('../../models/ShowLibrary');
const { LIBRARIES } = require('../../config/config');

const _ = require('lodash');


module.exports = async (id) => {
  debug(`######### Populating ${LIBRARIES.SHOWS}${id} ... #########`);
  const list = await getShows();
  if (list && list.length) {
    debug('---- fetched : ', list.length, 'movies ----');
    const toInsert = _.chunk(list, 100);
    return Promise.all(toInsert.map(async (chunk) => {
      return ShowLibraries[id].insertMany(chunk, { ordered: false });
    }))
      .then(() => ({ success: true, error: null }))
      .catch((err) => {
        return ({ success: true, error: err });
      });
  } else return ({ success: false, error: true });
};

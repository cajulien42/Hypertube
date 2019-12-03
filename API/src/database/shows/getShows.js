const debug = require('debug')('init:movies');
const axios = require('axios');
const _ = require('lodash');
const { ENV } = require('../../config/config');

async function getShows() {

  const request = require('request');

  request('https://tv-v2.api-fetch.website/exports/show', (error, response, body) => {
    debug('Status:', response.statusCode);
    debug('Headers:', JSON.stringify(response.headers));
    const resp = body.split('\n');
    debug(resp[0]);
    debug(JSON.parse(resp[0]));
  });
}


module.exports = getShows;

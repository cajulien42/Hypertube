const debug = require('debug')('routes:movies');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const wrapper = require('../middleware/wrapper');
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', wrapper(async (req, res) => {
  debug('Requesting movies...');
  return (axios.get('https://yts.ae/api/v2/list_movies.json')
    .then((result) => {
      // debug(result.data.data)
        return res.status(200).json({
          success: true,
          payload: result.data.data.movies,
        });
    })
  );
}));

module.exports = router;

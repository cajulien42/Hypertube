const debug = require('debug')('routes:movies');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const wrapper = require('../middleware/wrapper');
const Movie = require('../models/Movie');
const axios = require('axios');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', wrapper(async (req, res) => {
  debug('Requesting movies');
  const query = Movie.find({})
  const result = await query.exec((err, docs) =>  {
    if (err !== null) {
      throw new Error('Something went wrong');
    } debug('Success'); 
    return res.status(200).json({
      success: true,
      payload: docs,
    });
  });  
}))

module.exports = router;

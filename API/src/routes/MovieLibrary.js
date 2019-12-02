const debug = require('debug')('routes:movies');
const express = require('express');
const wrapper = require('../middleware/wrapper');
const MovieLibraries = require('../models/MovieLibrary');
const router1 = express.Router();
const router2 = express.Router();
// const axios = require('axios');

router1.use(express.json());
router1.use(express.urlencoded({ extended: true }));
router1.get('/', wrapper(async (req, res) => {
  debug('Requesting movies');
  const query = MovieLibraries[0].find({}).limit(150); // limit to not overload browser with 15000 movies....
  query.exec((err, docs) => {
    if (err !== null) {
      throw new Error('Something went wrong');
    } debug('Success');
    return res.status(200).json({
      success: true,
      payload: docs,
    });
  });
}));

router2.use(express.json());
router2.use(express.urlencoded({ extended: true }));
router2.get('/', wrapper(async (req, res) => {
  debug('Requesting movies');
  const query = Libraries[1].find({});
  await query.exec((err, docs) => {
    if (err !== null) {
      throw new Error('Something went wrong');
    } debug('Success');
    return res.status(200).json({
      success: true,
      payload: docs,
    });
  });
}));

module.exports = [router1, router2];

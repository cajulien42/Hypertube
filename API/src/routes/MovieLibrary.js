const debug = require('debug')('routes:movies');
const express = require('express');
const wrapper = require('../middleware/wrapper');
const MovieLibraries = require('../models/MovieLibrary');
const router = express.Router();
const axios = require('axios');
const { IMDB } = require('../config/config');

module.exports = (id) => {
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  router.get('/', wrapper(async (req, res) => {
    debug(' --- Requesting movies --- ');
    const query = MovieLibraries[id].find({}).limit(10);
    query.exec((err, docs) => {
      if (err !== null) {
        throw new Error('Something went wrong');
      } debug(' -- Success --');
      return res.status(200).json({
        success: true,
        payload: docs,
      });
    });
  }));

  router.get('/infos/:id', wrapper(async (req, res) => {
    const key = IMDB.KEY;
    debug(key);
    axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${req.params.id}`)
      .then((response) => {
        if (response.status === 200) {
          result = response.data;
        } else result = [];
        return res.status(200).json({
          success: true,
          payload: result,
        });
      });
  }));


  router.get('/search/page=:page', wrapper(async (req, res) => {
    debug(` --- Search route ---`);
    debug(req.query);
    const search = {
      year: { $gte: req.query.yMin, $lte: req.query.yMax },
      rating: { $gte: req.query.rMin, $lte: req.query.rMax },
    };
    if (req.query.genres) {
      const genres = req.query.genres.split(',');
      debug(genres);
      search.genres = { '$all': genres };
    }
    if (req.query.query) {
      search.title = new RegExp(req.query.query, 'i');
    }
    debug(search);
    if (req.query.genres || req.query.query) {
      options = {
        page: req.params.page,
        limit: 30,
        sort: { title: 1 },
      };
    } else {
      options = {
        page: req.params.page,
        limit: 30,
        sort: { popularity: 1 },
      };
    }
    MovieLibraries[id].paginate(search, options)
      .then((result) => {
        return res.status(200).json({
          success: true,
          payload: result,
        });
      });
  }));
  return router;
};

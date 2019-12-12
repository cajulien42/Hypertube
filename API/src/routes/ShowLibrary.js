const debug = require('debug')('routes:shows');
const express = require('express');
const wrapper = require('../middleware/wrapper');
const ShowLibraries = require('../models/ShowLibrary');
const router = express.Router();
const axios = require('axios');
const { IMDB, TVDB } = require('../config/config');

// const additionalInfos = async (shows) => {
//   const added = shows.map((show) => {
//     return axios.get(`http://www.omdbapi.com/?apikey=82d3dbb5&i=${show.id}`)
//       .then((response) => {
//         if (response.status === 200) {
//           return { show, additionalInfos: response.data };
//         } return show;
//       })
//       .catch((err) => show);
//   });
//   return Promise.all(added);
// };

module.exports = (id) => {
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  router.get('/', wrapper(async (req, res) => {
    debug(' --- Requesting shows --- ');
    const query = ShowLibraries[id].find({}).limit(10);
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

  router.get('/popular', wrapper(async (req, res) => {
    const key = TVDB.KEY;
    debug(key);
    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`)
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
        sort: { popularity: -1 },
      };
    }
    ShowLibraries[id].paginate(search, options)
      .then((result) => {
        return res.status(200).json({
          success: true,
          payload: result,
        });
      });
  }));
  return router;
};

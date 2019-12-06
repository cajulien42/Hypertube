const debug = require('debug')('routes:animes');
const express = require('express');
const wrapper = require('../middleware/wrapper');
const AnimeLibraries = require('../models/AnimeLibrary');
const router = express.Router();
const axios = require('axios');

const additionalInfos = async (animes) => {
  const added = animes.map((anime) => {
    return axios.get(`http://www.omdbapi.com/?apikey=82d3dbb5&i=${anime.id}`)
      .then((response) => {
        if (response.status === 200) {
          return { anime, additionalInfos: response.data };
        } return anime;
      })
      .catch((err) => anime);
  });
  return Promise.all(added);
};

module.exports = (id) => {
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  router.get('/', wrapper(async (req, res) => {
    debug(' --- Requesting animes --- ');
    const query = AnimeLibraries[id].find({ popularity: { $gte: 1, $lte: 3 } }).limit(150);
    // limit to not overload browser with 15000 animes....
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

  router.get('/page=:page', wrapper(async (req, res) => {
    debug(` --- Requesting page ${req.params.page} ---`);
    const query = AnimeLibraries[id].find({}).skip(req.params.page * 10).limit(10);
    // limit to not overload browser with 15000 animes....
    query.exec((err, docs) => {
      if (err !== null) {
        throw new Error('Something went wrong');
      } debug(' -- Success --');
      additionalInfos(docs).then((result) => {
        return res.status(200).json({
          success: true,
          payload: result,
        });
      });
    });
  }));
  return router;
};

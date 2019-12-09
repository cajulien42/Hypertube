const debug = require('debug')('routes:movies');
const express = require('express');
const wrapper = require('../middleware/wrapper');
const MovieLibraries = require('../models/MovieLibrary');
const router = express.Router();
const axios = require('axios');

const additionalInfos = async (movies) => {
  const added = movies.map((movie) => {
    return axios.get(`http://www.omdbapi.com/?apikey=82d3dbb5&i=${movie.id}`)
      .then((response) => {
        if (response.status === 200) {
          return { movie, additionalInfos: response.data };
        } return movie;
      })
      .catch((err) => movie);
  });
  return Promise.all(added);
};

module.exports = (id) => {
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  router.get('/', wrapper(async (req, res) => {
    debug(' --- Requesting movies --- ');
    const query = MovieLibraries[id].find({}).limit(10);
    // limit to not overload browser with 15000 movies....
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

  router.get('/page=:page', wrapper(async (req, res) => {
    debug(` --- Requesting page ${req.params.page} ---`);
    const query = MovieLibraries[id].find({}).skip(req.params.page * 10).limit(10);
    // limit to not overload browser with 15000 movies....
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

  router.get('/search/', wrapper(async (req, res) => {
    debug(` --- Search route ---`);
    debug(req.params);
    debug(req.query);
    const query = MovieLibraries[id].find({}).limit(10);
    // limit to not overload browser with 15000 movies....
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

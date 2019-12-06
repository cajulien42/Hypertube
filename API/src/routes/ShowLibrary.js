const debug = require('debug')('routes:shows');
const express = require('express');
const wrapper = require('../middleware/wrapper');
const ShowLibraries = require('../models/ShowLibrary');
const router = express.Router();
const axios = require('axios');

const additionalInfos = async (shows) => {
  const added = shows.map((show) => {
    return axios.get(`http://www.omdbapi.com/?apikey=82d3dbb5&i=${show.id}`)
      .then((response) => {
        if (response.status === 200) {
          return { show, additionalInfos: response.data };
        } return show;
      })
      .catch((err) => show);
  });
  return Promise.all(added);
};

module.exports = (id) => {
  router.use(express.json());
  router.use(express.urlencoded({ extended: true }));
  router.get('/', wrapper(async (req, res) => {
    debug(' --- Requesting shows --- ');
    const query = ShowLibraries[id].find({}).limit(50);
    // limit to not overload browser with 15000 shows....
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
    const query = ShowLibraries[id].find({}).skip(req.params.page * 10).limit(10);
    // limit to not overload browser with 15000 shows....
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

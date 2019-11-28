const debug = require('debug')('init:createDb');
const axios = require('axios');
const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const _ = require('lodash');
    
async function checkDb() {
  mongoose.connect('mongodb://localhost/Hypertube', { useNewUrlParser: true , useUnifiedTopology: true  }, (err) => {
    debug(err);
  });
}

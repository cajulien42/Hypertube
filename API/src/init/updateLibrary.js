const debug = require('debug')('init:createDb');
const axios = require('axios');
const mongoose = require('mongoose');
const libraries = require('../models/Library');

async function resetLibrary(id) {
  return mongoose.connect('mongodb://localhost/Hypertube', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    debug(`Emptying library ${id} ...`);
    libraries[id].collection.drop();
  });
}

async function getMoviesYst() {
  return axios.get('https://yts.ae/api/v2/list_movies.json')
    .catch((err) => debug(err));
}

async function parseMovies() {
  const list = await getMoviesYst();
  return movies = list.data.data.movies.map((movie) => ({
    id: movie.imdb_code,
    title: movie.title,
    englishTitle: movie.title_english,
    year: movie.year,
    rating: movie.rating,
    runtime: movie.runtime,
    genres: movie.genres,
    synopsis: movie.synopsis,
    language: movie.language,
    smallCover: movie.small_cover_image,
    mediumCover: movie.medium_cover_image,
    largeCover: movie.large_cover_image,
    state: movie.state,
    trailer: movie.yt_trailer_code,
    torrents: movie.torrents,
    seen: false,
  }));
}

async function populateLibrary(id) {
  debug(`Populating library ${id} ... `);
  const list = await parseMovies();
  const movies = { movies: list };
  const res = await libraries[id].create(movies)
    .catch((err) => {
      debug(err);
      return ({ success: false, error: err });
    });
  if (res.success === false) {
    return (res);
  } debug(res);
  return ({ sucess: true, error: null });
}

async function initLibrary(id) {
  return resetLibrary(id)
    .then(() => populateLibrary(id))
    .catch((err) => debug(err));
}

module.exports = initLibrary;

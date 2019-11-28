const debug = require('debug')('init:createDb');
const axios = require('axios');
const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const _ = require('lodash');
    
async function resetDb() {
  mongoose.connect('mongodb://localhost/Hypertube', { useNewUrlParser: true , useUnifiedTopology: true  }, function(){
    mongoose.connection.db.dropDatabase();
  });
}

async function getMoviesYst() {
  return axios.get('https://yts.ae/api/v2/list_movies.json')
    .catch(err => debug(err));
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
  }))
}

async function createDb() {
    await resetDb();
    const movies = await parseMovies();
    const res = await Movie.insertMany(movies)
      .catch(err => { return({ success : false, error: err }) })
    if (res.success === false) {
      return(res)
    } return({sucess: true, error: null})

}

module.exports = createDb;
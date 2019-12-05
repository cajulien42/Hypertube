const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  id: String,
  title: String,
  englishTitle: String,
  year: Number,
  rating: Number,
  runtime: Number,
  genres: [String],
  synopsis: String,
  language: String,
  smallCover: String,
  mediumCover: String,
  largeCover: String,
  state: String,
  trailer: String,
  torrents: [],
  popularity: Number,
  source: String,
});

const MovieLibrary0 = mongoose.model('movie_library0', movieSchema);
const MovieLibrary1 = mongoose.model('movie_library1', movieSchema);

module.exports = [MovieLibrary0, MovieLibrary1];

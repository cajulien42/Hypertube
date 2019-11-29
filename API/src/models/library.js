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
  seen: Boolean,
});

const librarySchema = new mongoose.Schema({
  movies: [movieSchema],
});

const library0 = mongoose.model('library0', librarySchema);
const library1 = mongoose.model('library1', librarySchema);

module.exports = [library0, library1];

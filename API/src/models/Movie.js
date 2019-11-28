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
    torrents : [],
    seen: Boolean,
  });
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
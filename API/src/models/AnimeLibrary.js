const mongoose = require('mongoose');
const { LIBRARIES } = require('../config/config');

const animeSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true, dropDups: true },
  title: { type: String, required: false },
  year: { type: Number, required: false },
  runtime: { type: String, required: false },
  genres: { type: [String], required: false },
  synopsis: { type: String, default: 'There is no synopsis for this movie' },
  language: { type: String, required: false },
  images: { type: {} },
  seasons: { type: Number, required: false },
  source: { type: String, required: false },
  rating: { type: {} },
  episodes: [],
});

const AnimeLibrary0 = mongoose.model(`${LIBRARIES.ANIMES}0`, animeSchema);
const AnimeLibrary1 = mongoose.model(`${LIBRARIES.ANIMES}1`, animeSchema);

module.exports = [AnimeLibrary0, AnimeLibrary1];

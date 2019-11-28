
const debug = require('debug')('models:library');


class MovieManager {
  constructor(data) {
    this.data = data;
    const mongoose = require('mongoose');
    this.mongoose = mongoose;
    this.movieSchema = new mongoose.Schema({
      id: String,
      title: String,
      seen: Boolean,
    });
    this.Movie = this.mongoose.model('Movie', this.movieSchema);
    debug('HIHI');
  }

  async create() {
    await this.mongoose.connect('mongodb://localhost/myDB');
    const movie = new this.Movie({
      id: this.id,
      title: this.title,
      seen: this.seen,
    })
    const result = await movie.save();
    debug('HAHAHAHAHA', result);

  }

  async get() {
    await
  }
} 

module.exports = MovieManager;

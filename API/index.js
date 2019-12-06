
const debug = require('debug')('index');
const mongoose = require('mongoose');
const Server = require('./src/models/Server');
const initMovieLibrary = require('./src/database/movies/initLibrary');
const initShowLibrary = require('./src/database/shows/initLibrary');
const initAnimeLibrary = require('./src/database/animes/initLibrary');
// const updateMovieLibrary = require('./src/database/movies/updateLibrary'); // replace init by update THERE ->(*) if wanna force resetDB, DEV purpose only
// const updateShowLibrary = require('./src/database/shows/updateLibrary'); // replace init by update THERE ->(*) if wanna force resetDB, DEV purpose only
// const updateAnimeLibrary = require('./src/database/animes/updateLibrary'); // replace init by update THERE ->(*) if wanna force resetDB, DEV purpose only
const { DATABASE } = require('./src/config/config');

const checkDbConnection = async () => {
  return mongoose.connect(`mongodb://${DATABASE.HOST}/${DATABASE.NAME}`, DATABASE.OPTIONS, (err) => {
    if (err) debug(err);
  });
};

initLibraries = () => {
  return Promise.all([
    initMovieLibrary(0),
    initShowLibrary(0),
    initAnimeLibrary(0),
  ]);
};

checkDbConnection()
  .then(() => initLibraries()) // (*) HERE
  .then((res) => {
    if (res[0].success === true && res[1].success === true && res[2].success === true) {
      debug('######  Starting server #####');
      new Server().listen();
    } else return process.exit(0);
  })
  .catch((err) => {
    debug(err);
    return process.exit(0);
  });

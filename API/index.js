
const debug = require('debug')('index');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const movies = require('./src/routes/movies');
const MovieManager = require('./src/models/library');

const error = require('./src/middleware/error');

const app = express();

new MovieManager().create();


app.use(helmet());
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(cors());
app.use('/movies', movies);


app.use(error);
app.use((req, res, next) => {
  res.status(404);

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: '404 Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('404 Not found');
});


app.listen(4000, () => debug(`Listening on port ${4000}...`));


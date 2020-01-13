const debug = require('debug')('routes:Video');
const express = require('express');
const router = express.Router();
const downloadFactory = require('../models/Download');
const readStream = require('../models/ReadStream');
const wrapper = require('../middleware/wrapper');
const fs = require('fs');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const Factory = new downloadFactory();

router.use('/download/:hash', (req, res) => {
  debug('Request on video download route for ' + req.params.hash);
  Factory.Download(req.params.hash)
    .then((result) => {
      res.status(200).send('downloading');
    });
});

router.use('/check/:hash', (req, res) => {
  debug(req.query);
  if (req.query.seeking && req.query.rate) {
    const queryRate = parseFloat(req.query.rate) + 0.01;
    const possibleRate = Factory.engines[req.params.hash].lastPiece * Factory.engines[req.params.hash].torrent.pieceLength / Factory.engines[req.params.hash].film.length;
    if (Factory.engines[req.params.hash].downloaded === true || queryRate < possibleRate) {
      console.log('check answered true');
      res.status(200).send({ ready: true });
    } else {
      console.log('check answered false');
      res.status(200).send({ ready: false });
    }
  } else {
    const ready = Factory.isReady(req.params.hash);
    debug('check result : ' + ready);
    res.status(200).send({ ready });
  }
});

router.use('/subtitles/:hash', (req, res) => {
  if (!Factory.engines[req.params.hash]) {
    return res.status(200).send('Can\'t find film');
  }
  console.log('subtitles please')
  const subtitles = [];
  const path = `${process.env.FILMPATH}/${Factory.engines[req.params.hash].torrent.name}`;
  fs.readdir(path, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach((file) => {

      console.log(file.split('.').pop());
      if (file.split('.').pop() === 'vtt') {
        subtitles.push(Factory.engines[req.params.hash].torrent.name + '/' + file);
      }
      console.log(file);
    });
    res.status(200).send(subtitles);
  });
});

router.use('/subtitle/:hash/:track', (req, res) => {
  if (!Factory.engines[req.params.hash]) {
    return res.status(200).send('Can\'t find film');
  }
  console.log('file sendion')
  const path = `${process.env.FILMPATH}/${Factory.engines[req.params.hash].torrent.name}/${eq.params.track}`;
  res.sendFile(path);
});

router.use('/stream/:hash', (req, res) => {
  //console.log(Factory);
  console.log(req.params.hash);
  console.log(req.headers.range);
  if (!Factory.engines[req.params.hash]) {
    return res.status(200).send('Can\'t find film');
  }
  const path = `${process.env.FILMPATH}/${Factory.engines[req.params.hash].torrent.name}/${Factory.engines[req.params.hash].film.name}`;
  debug(`path = ${path}`);
  readStream(path, req, res);
  debug('Request on video stream route for ' + req.params.hash);
});

module.exports = router;

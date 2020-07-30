const fs = require('fs');
const debug = require('debug')('routes:Video/Film');
const throttle = require('throttle');

module.exports = (path, req, res) => {
  if (fs.existsSync(path)) {
    debug('File Found');
    
    const stat = fs.statSync(decodeURIComponent(path));
    console.log('file size is ' + stat.size);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      console.log('range is ' + range)
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      if(stat.size === start) res.status(200).send('Stream done')
      else {
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize + 1;
        const chunksize = (end-start)+1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/*`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
      }
    } else {
      console.log('mdrjekgbwesklgbwkjgegl,ngqekglqnklqbejfklaenqekbfael;naojvaelfnakbfafkanfaevlf')
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      fs.createReadStream(path).pipe(res);
    }
  } else {
    res.status(200).send('streamable');
  }
};

// if (film.name.split('.').pop() === 'mkv') {
          //   engine.encoding = true;
          //   engine.ready = true;
          //   engine.stream = film.createReadStream();
          // ffmpeg(film.createReadStream())
          //   .addOptions([
          //     '-movflags frag_keyframe+empty_moov',
          //     '-g 52',
          //     '-vcodec libx264',
          //     '-vb 448k',
          //     '-acodec aac',
          //     '-ab 64k'
          //   ])
          //   .outputFormat('mp4')
          //   .on('codecData', function (data) {
          //     console.log('Input is ' + data.audio + ' audio ' +
          //       'with ' + data.video + ' video');
          //   })
          //   .on('end', () => {
          //     console.log('finished converting mp4 file');
          //     engine.encoding = false;
          //     engine.downloaded = true;
          //     console.log('torrentStream Notice: Engine', engine.infoHash, 'downloaded');
          //     Movie.findOneAndUpdate({ hash }, { downloaded: true });
          //   })
          //   .on('error', function (err, stdout, stderr) {
          //     console.log('Error: ' + err.message);
          //     console.log('ffmpeg output:\n' + stdout);
          //     console.log('ffmpeg stderr:\n' + stderr);
          //   })
          //   .on('progress', function (progress) {
          //     console.log(progress);
          //   })
          //   .output(`${engine.folder}/${film.name.replace('.mkv', '.mp4')}`)
          //   .run()
          //} else {
            readStreamEncoding = (hash, path, req, res) => {
              //if (fs.existsSync(path)) {
              const stream = this.engines[hash].film.createReadStream()
              const head = {
                'Transfer-Encoding': 'chunked',
                //'Content-Range': `bytes ${start}-${end}/*`,
                'Accept-Ranges': 'bytes',
                //'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
              };
              res.writeHead(200, head);
              stream.pipe(res)
              //   ffmpeg()
              //     .input(this.engines[hash].stream)
              //     .outputOptions('-movflags frag_keyframe+empty_moov')
              //     .outputFormat('mp4')
              //     .on('start', () => {
              //       console.log('start')
              //     })
              //     .on('progress', (progress) => {
              //       console.log(`progress: ${progress.timemark}`)
              //     })
              //     .on('end', () => {
              //       console.log('Finished processing')
              //     })
              //     .on('error', (err) => {
              //       console.log(`ERROR: ${err.message}`)
              //     })
              //     .inputFormat('mkv')
              //     .audioCodec('aac')
              //     .videoCodec('libx264')
              //     .output(`${this.engines[hash].folder}/${this.engines[hash].film.name.replace('.mkv', '.mp4')}`)
              //     .pipe(res)
              // res.on('close', () => {
              //   stream.destroy()
              // })
              // }
              //   debug('File Found');
              //   const limit = new throttle(511111);
              //   const stat = fs.statSync(decodeURIComponent(path));
              //   console.log('file size is ' + stat.size);
              //   const fileSize = stat.size;
              //   const range = req.headers.range;
              //   if (range) {
              //     console.log('range is ' + range)
              //     const parts = range.replace(/bytes=/, '').split('-');
              //     const start = parseInt(parts[0], 10);
              //     //if(stat.size === start) res.status(200).send('Stream done')
              //     //else {
              //       const end = parts[1] ? parseInt(parts[1], 10) : 100000000000;
              //       const chunksize = (end-start)+1;
              //       const file = fs.createReadStream(path, { start, end });
              //       const head = {
              //         'Transfer-Encoding': 'chunked', 
              //         'Content-Range': `bytes ${start}-${end}/*`,
              //         'Accept-Ranges': 'bytes',
              //         //'Content-Length': chunksize,
              //         'Content-Type': 'video/mp4',
              //       };
              //       res.writeHead(200, head);
              //       file.pipe(limit).pipe(res);
              //    // }
              //   } else {
              //     console.log('mdrjekgbwesklgbwkjgegl,ngqekglqnklqbejfklaenqekbfael;naojvaelfnakbfafkanfaevlf')
              //     const head = {
              //       'Content-Length': fileSize,
              //       'Content-Type': 'video/mp4',
              //     };
              //     res.writeHead(206, head);
              //     fs.createReadStream(path).pipe(limit).pipe(res);
              //   }
              // } else {
              //   res.status(206).send('not streamable');
              // }
            };
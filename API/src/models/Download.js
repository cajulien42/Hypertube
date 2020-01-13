const torrentStream = require('torrent-stream');
const Movie = require('../models/Movie');
const srt2vtt = require('srt-to-vtt');
const fs = require('fs');

module.exports = class DownloadFactory {
  constructor() {
    this.engines = {}; /* 'Hash' : [engines ...] */
  }

  updateLastPiece(hash, pieceIndex) {
    if (!this.engines[hash]) {
      return null;
    } else {
      this.engines[hash].lastPiece = this.engines[hash].downloadedPieces.findIndex((element) => !element);
      this.engines[hash].lastPiece = this.engines[hash].lastPiece === -1 ? pieceIndex : this.engines[hash].lastPiece;
    }
  }

  setUpEngine(hash) {
    const engine = this.engines[hash];

    engine.on('download', (pieceIndex) => {
      engine.downloadedPieces[pieceIndex] = true;
      this.updateLastPiece(hash, pieceIndex);
      const completion = Math.round((100 * engine.swarm.downloaded) / engine.film.length);
      if (pieceIndex % 10 === 0) {
        console.log('torrentStream Notice: Engine');
        console.log('Condition ', engine.lastPiece * 100, '>', engine.nbPiece);
        console.log('Completion ', completion, ' %');
      }
      engine.ready = (engine.lastPiece * 100 > engine.nbPiece) ||  completion > 25 ? true : false;
    });

    engine.on('idle', () => {
      engine.downloaded = true;
      console.log('torrentStream Notice: Engine', engine.infoHash, 'downloaded');
      Movie.updateOne({ hash }, { $set: { downloaded: true } });
    });
  }

  createMagnet(hash) {
    return new Promise((resolve, reject) => {
      const trackers = [
        'udp://open.demonii.com:1337',
        'udp://tracker.istole.it:80',
        'http://tracker.yify-torrents.com/announce',
        'udp://tracker.publicbt.com:80',
        'udp://tracker.openbittorrent.com:80',
        'udp://tracker.coppersurfer.tk:6969',
        'udp://exodus.desync.com:6969',
        'http://exodus.desync.com:6969/announce',
        'udp://tracker.openbittorrent.com:80/announce',
      ];
      resolve((`magnet:?xt=urn:btih:${hash}&tr=` + trackers.join('&tr=')));
    });
  }

  getEngine(hash) {
    if (!this.engines[hash]) return null;

    return this.engines[hash].engine;
  }

  saveHash(hash, engine) {
    return new Promise((resolve, reject) => {
      const newMovie = new Movie({
        hash: hash,
        downloaded: false,
        folder: `${process.env.FILMPATH}/${engine.torrent.name}`,
      });
      Movie.findOne({ hash })
        .then((result) => {
          if (!result) {
            newMovie.save()
              .then(() => {
                resolve();
              })
              .catch((e) => {
                reject(new Error(e.message));
              });
          } else if (result.downloaded === false && !this.engines[hash]) {
            console.log(`deleting files in ${process.env.FILMPATH}/${engine.torrent.name}`);
            fs.readdir(`${process.env.FILMPATH}/${engine.torrent.name}`, {withFileTypes: true}, (err, files) => {
              if (err) throw err;
              console.log(files);
              const filesName = files
              .filter(dirent => !dirent.isDirectory())
              .map(dirent => dirent.name);
              for (const file of filesName) {
                fs.unlink(`${process.env.FILMPATH}/${engine.torrent.name}/${file}`, (err)=> {
                  if (err) throw err;
                });
              }
              setTimeout(()=>resolve(), 5000);
            });
          } else {
            resolve();
          }
        })
        .catch((e) => {
          reject(new Error(e.message));
        });
    });
  }

  Download(hash) {
    return new Promise(async (resolve, reject) => {
      const magnet = await this.createMagnet(hash);
      // An Engine already exists for this hash
      if (this.engines[hash]) {
        resolve();
      } else {
        let film;
        const engine = torrentStream(magnet, { path: `${process.env.FILMPATH}/` });
        engine.on('ready', async () => {
          await this.saveHash(hash, engine);
          engine.files.forEach((file) => {
            console.log(file.name);
            const extension = file.name.split('.').pop();
            console.log(extension);
            if (extension === 'srt') {
              console.log('subtitle Found');
              file.createReadStream()
                .pipe(srt2vtt())
                .pipe(fs.createWriteStream(`${process.env.FILMPATH}/${engine.torrent.name}/${file.name.replace('.srt', '.vtt')}`));
            } else if (extension !== 'mp4' && extension !== 'mkv') {
              // Ignore non-movie files
            } else if (film && current.length < film.length) {
              // Already a bigger movie film
            } else {
              console.log('film Found');
              film = file;
            }
          });
          if (!film) {
            engine.removeAllListeners();
            engine.destroy();
            reject(new Error('no valid movie file found.'));
          }
          console.log('engine length', engine.torrent.length, 'file.length', film.length);
          engine.nbPiece = Math.floor((film.length / engine.torrent.pieceLength));
          engine.downloadedPieces = [];
          engine.film = film;
          this.engines[hash] = engine;
          film.select();
          this.setUpEngine(hash);
          resolve(film);
        });
      }
    });
  }

  isReady(hash) {
    if (!this.engines[hash] || (!this.engines[hash].ready && !this.engines[hash].downloaded)) return false;
    else return this.engines[hash].ready === true || this.engines[hash].downloaded === true ? true : false;
  }
};

//   async createEngine(magnet) {
//     return new Promise((resolve, reject) => {
//       try {
//         const engine = torrentStream(magnet, {
//           uploads: 0,
//           path: 'public',
//         });
//         resolve(engine);
//       } catch (e) {
//         debug('erreur ici' + e);
//         resolve(e);
//       }
//     });
//   }
//   async newDownload(hash, res) {
//     const magnet = await this.createMagnet(hash);
//     const engine = await this.createEngine(magnet);
//     engine.on('ready', async () => {
//       debug('Engine Ready');
//       debug('dirname:', engine.torrent.name);
//       engine.files.forEach((file) => {
//         debug('filename:', file.name);
//         const extension = file.name.split('.').pop();
//         if (extension === 'mp4') {
//           engine.stream = file.createReadStream;
//           console.log(engine.stream);
//         } else {
//           file.deselect();
//         }
//       });
//       console.log('start dl');
//       //ffmpeg -i sample.mp4 -profile:v baseline -level 3.0 -s 840x560 -start_number 0 -hls_list_size 0 -f hls sample.m3u8
//       ffmpeg(engine.stream())
//         .addOptions([
//           '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
//           '-level 3.0',
//           '-s 640x360',          // 640px width, 360px height output video dimensions
//           '-start_number 0',     // start the first .ts segment at index 0
//           '-hls_time 10',        // 10 second segment duration
//           '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
//           '-f hls'               // HLS format
//         ]).output(`public/output.m3u8`).on('end', () => {
//           engine.destroy();
//           console.log('engine destroyes');
//         }).on('codecData', function(data) {
//           console.log('Input is ' + data.audio + ' audio ' +
//             'with ' + data.video + ' video');
//         })
//         .run();
//     });
//     engine.on('download', (pieceIndex) => {
//       console.log('downloaded piece' + pieceIndex);
//     });

//     engine.on('idle', () => {
//     });

//     engine.on('upload', (pieceIndex) => {
//     });
//   }
// };
// // async saveHash(hashInfo) {
// //   return new Promise(async (resolve, reject) => {
// //     const newHash = await downloadModel.findOneAndUpdate({ hash: hashInfo.hash }, hashInfo, { upsert: true });
// //     debug(newHash);
// //     // .catch qqchose
// //   });
// // }
// // async deleteEngines(hash) {
// //   if (this.engines[hash]) {
// //     const closeEngines = await this.engines[hash].map((engine) => {
// //       return new Promise((resolve, reject) => {
// //         debug('engine destroyed' + JSON.stringify(this.engines));
// //         engine.destroy(() => {
// //           resolve();
// //         });
// //       });
// //     });
// //     Promise.all(closeEngines)
// //       .then(() => {
// //         this.saveHash(this.status[hash]);
// //       });
// //   }
// // }
// // async saveFactory() {
// //   debug(this.status);
// //   for (const hash in this.engines) {
// //     if (this.engines[hash]) {
// //       const closeEngines = await this.engines[hash].map((engine) => {
// //         return new Promise((resolve, reject) => {
// //           debug('engine destroyed');
// //           engine.destroy(() => {
// //             resolve();
// //           });
// //         });
// //       });
// //       Promise.all(closeEngines)
// //         .then(() => {
// //           this.saveHash(this.status[hash]);
// //         });
// //       console.log(hash);
// //     }
// //   }
// // }
// // checkDownloadStatus(hash) {
// //   /* Use Hash as Unique Key to retrieve info on a torrent
//   ** Check in Database if information exists on this torrent
//   ** Return the infos if it exists */
//   return new Promise((resolve, reject) => {
//     if (this.status[hash]) {
//       resolve(this.status[hash]);
//     } else {
//       downloadModel.findOne({ hash: hash }, (err, res) => {
//         if (err) throw err;
//         if (res) this.status[hash] = res;
//         resolve(res);
//       });
//     }
//   });
// }

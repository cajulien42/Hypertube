const debug = require('../../../node_modules/debug/src')('database:users:check');
const { User } = require('../../models/user');

const users = [
  {
    username: 'philoutre',
    firstName: 'Philippine',
    lastName: 'Sentilhes',
    email: 'philou@gmail.com',
    password: '$2b$10$p5rjxRO46kBbcLAtF9A3UeGxhlmsSFhRw.25KZ1xGihfwgvHt1rJC',
    photo: 'https://geo.img.pmdstatic.net/fit/https.3A.2F.2Fwww.2Eneonmag.2Efr.2Fcontent.2Fuploads.2F2019.2F08.2Fotter-1438381_1280.2Ejpg/1024x1024/quality/80/background-color/ffffff/background-alpha/100/focus-point/640%2C370/crop-zone/0%2C0-1280x737/loutres.jpg',
  },
  {
    username: 'camouille',
    firstName: 'Camille',
    lastName: 'Juliette',
    email: 'camsLeGrosDurdu77@test.co',
    password: '$2b$10$p5rjxRO46kBbcLAtF9A3UeGxhlmsSFhRw.25KZ1xGihfwgvHt1rJC',
    photo: 'https://i.pinimg.com/236x/37/5b/27/375b2721e93efa52866ca91cc7d48158.jpg',
  },
  {
    username: 'bento',
    firstName: 'Benjamine',
    lastName: 'Tollié',
    email: 'benjaaaam@test.co',
    password: '$2b$10$p5rjxRO46kBbcLAtF9A3UeGxhlmsSFhRw.25KZ1xGihfwgvHt1rJC',
    photo: 'https://images-na.ssl-images-amazon.com/images/I/51S8YHg1gDL._SY355_.jpg',
  },
  {
    username: 'clem',
    firstName: 'Clemzer',
    lastName: 'DuTerrTerr',
    email: 'zerrzerrdanslebendo@test.co',
    password: '$2b$10$p5rjxRO46kBbcLAtF9A3UeGxhlmsSFhRw.25KZ1xGihfwgvHt1rJC',
    photo: 'https://pbs.twimg.com/profile_images/526653360691113985/QC4amJr9_400x400.png',
  },
];

const eraseDB = () => {
  return new Promise( (resolve) => {
    debug(`DROPPING USERS COLLECTION`);
    User.collection.drop()
      .then((res) => {
        resolve(debug(`Has collection been dropped ? ${res}`));
      })
      .catch((err) => {
        resolve(debug(`Has collection been dropped ? ${err}`));
      });
  });
};

module.exports = async () => {
  return new Promise(async (resolve, reject) => {
    debug(`######### Checking if there are users ############`);
    const query = await User.find();
    if (query !== null && query.length) {
      debug('--- User count: ---', query.length);
      resolve({ success: true, error: null });
    } else {
      debug('--- No users, populating.... ---');
      eraseDB()
        .then((res) => {
          User.insertMany(users, (err, docs) => {
            debug(docs);
            debug('--- User count: ---', docs.length);
            resolve({ success: true, error: null });
          });
        });
    };
  });
};

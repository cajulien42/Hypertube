const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FortyTwoStrategy = require('passport-42').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models/user');
const { FORTYTWO } = require('../config/config');
const debug = require('debug')('config');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      else if (!user) { debug('here3'); return done(null, false); }
      user.verifyPassword(password, user)
        .then((res) => {
          if (res === true) return done(null, user);
          else {
            debug('here2');
            return done(null, false);
          }
        })
        .catch((err) => { debug('here1', err); done(null, false) });
    });
  }
));

passport.use(new FortyTwoStrategy({
  clientID: FORTYTWO.APP_ID,
  clientSecret: FORTYTWO.APP_SECRET,
  callbackURL: 'http://localhost:3000/API/auth/42/callback',
  profileFields: {
    'id': function (obj) { return String(obj.id); },
    'username': 'login',
    'email': 'email',
    'photo': 'image_url'
  }
},
function(accessToken, refreshToken, profile, cb) {
  debug('here');
  let id42 = profile.id;
  let username = profile.username;
  debug(username);
  debug(profile)
  return cb(null, profile);
}
));

module.exports = passport;


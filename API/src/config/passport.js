const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FortyTwoStrategy = require('passport-42').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../models/user');
const { FORTYTWO, GOOGLE, FB } = require('../config/config');
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
    'photo': 'image_url',
    'firstName': 'first_name',
    'lastName': 'last_name',
  }
},
function(accessToken, refreshToken, profile, cb) {
  debug(profile.firstName);
  User.findOrCreate({
    fortytwoId: profile.id,
    username: profile.username,
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    photo: profile.photo,
  }, (err, user) => {
    // debug(user);
    return cb(err, user);
  });
}
));

passport.use(new FacebookStrategy({
  clientID: FB.FACEBOOK_APP_ID,
  clientSecret: FB.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/API/auth/facebook/callback',
},
function(accessToken, refreshToken, profile, done) {
  debug(profile);
  User.findOrCreate({
    FBId: profile.id,
    username: profile.displayName,
    firstName: 'FBtest',
    lastName: 'FBtest',
    email: 'test@example.com',
    photo: '',
  }, (err, user) => {
    // debug(user);
    return cb(err, user);
  });
}
));


passport.use(new GoogleStrategy({
  clientID: GOOGLE.GOOGLE_ID,
  clientSecret: GOOGLE.GOOGLE_SECRET,
  callbackURL: 'http://localhost:3000/API/auth/google/callback',
},
function(token, tokenSecret, profile, done) {
  debug(profile);
  // User.findOrCreate({
  //   fortytwoId: profile.id,
  //   username: profile.username,
  //   firstName: profile.firstName,
  //   lastName: profile.lastName,
  //   email: profile.email,
  //   photo: profile.photo,
  // }, (err, user) => {
  //   // debug(user);
  //   return cb(err, user);
  // });
}
));

module.exports = passport;


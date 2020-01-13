const Joi = require('../../node_modules/@hapi/joi/lib');
const bcrypt = require('bcrypt');
const express = require('../../node_modules/express');
const debug = require('../../node_modules/debug/src')('routes:auth');
const router = express.Router();
const { User } = require('../models/user');
const { JWT } = require('../config/config');
const jwt = require('jsonwebtoken');
const wrapper = require('../middleware/wrapper');
const passport = require('../config/passport');
const axios = require('axios');

router.use(express.json());

validate = (user) => {
  const schema = Joi.object({
    username: Joi.string().regex(/^[a-zA-Z-àæéëèêçàùûîïÀÆÉÈÊÇÀÛÙÜÎÏ0-9]{2,18}$/i).required().min(2).max(18),
    password: Joi.string().regex(/^[^`\\<>]{7,150}$/i).required().min(7).max(150),
  });

  return schema.validate(user);
};

router.use(passport.initialize());

router.get('/42',
  passport.authenticate('42'));

router.get('/42/callback', (req, res, next) => {
  passport.authenticate('42', { failureRedirect: '/42' },
    (err, user, info) => {
      debug('after verif', err, user);
      if (err || !user) {
        return res.send({ success: false, err });
      } else if (err === null && user) {
        const token = jwt.sign({
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          photo: user.photo,
          defaultLanguage: user.defaultLanguage,
          isAdmin: user.isAdmin,
          linkReset: user.linkReset,
        }, JWT.KEY);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.cookie('token', token, { maxAge: 86400 * 1000, httpOnly: false });
        res.redirect('http://localhost:3000');
        // res.send({ success: true, payload: token, username: user.username });
      }
    })(req, res);
});


router.post('/login', (req, res, next) => {
  const { error } = validate(req.body);
  if (error) throw new Error('Bad authentification');
  passport.authenticate('local', { session: false }, (err, user, info) => {
    debug('after verif', err, user);
    if (err || !user) {
      return res.send({ success: false, err });
    } else if (err === null && user) {
      const token = jwt.sign({
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        photo: user.photo,
        defaultLanguage: user.defaultLanguage,
        isAdmin: user.isAdmin,
        linkReset: user.linkReset,
      }, JWT.KEY);
      res.send({ success: true, payload: token, username: user.username });
    }
  })(req, res);
});

module.exports = router;

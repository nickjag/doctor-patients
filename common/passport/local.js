const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserService = require('../../services/user.js');

const { tokenForUser, mapUserForResponse } = require('../../includes/utils');

const verifyCallback = (incomingUsername, incomingPassword, done) => {
  UserService.authenticateUserByUsername(incomingUsername, incomingPassword)
    .then(user => (user ? done(null, user) : done(null, false)))
    .catch(err => done(err, false));
};

const strategyLocalLogin = new LocalStrategy(
  { usernameField: 'username' },
  verifyCallback,
);

const useLocalLogin = (req, res, next) =>
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        error_type: 'invalid_login',
        error_message: 'Oops! That user/pass is incorrect.',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);

const localSendToken = (req, res) =>
  res.send(
    mapUserForResponse(
      {
        _id: req.user._id,
        user_type: req.user.user_type,
        username: req.user.username,
        user_data: {
          first_name: req.user.user_data.first_name,
          last_name: req.user.user_data.last_name,
        },
      },
      tokenForUser(req.user),
    ),
  );

module.exports = {
  strategyLocalLogin,
  useLocalLogin,
  localSendToken,
};

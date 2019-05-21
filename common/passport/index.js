const passport = require('passport');
const nodeErr = require('node-err');
const UserService = require('../../services/user');

const {
  getLoggedInUserId,
  getRequestedUserId,
} = require('../../includes/utils');

const { strategyJwtLogin, requireAuth } = require('./jwt');

const {
  strategyLocalLogin,
  useLocalLogin,
  localSendToken,
} = require('./local');

const unAuthorizedResponse = {
  error_type: 'invalid_param_auth',
  error_message: 'Unauthorized',
};

const isOwner = async (req, res, next) => {
  const myUserId = getLoggedInUserId(req);
  const reqUserId = getRequestedUserId(req);

  if (myUserId && reqUserId && myUserId === reqUserId) {
    return next();
  }

  return res.status(401).json(unAuthorizedResponse);
};

const setIdByUsername = async (req, res, next) => {
  const { username } = req.params;

  if (!username) {
    return res.status(404).send({
      error_message: 'That user was not be found',
    });
  }

  let user;

  try {
    user = await UserService.findByUsername(username);
  } catch (err) {
    nodeErr.stop(err, { req });
    return next(err);
  }

  if (!user) {
    return res.status(404).send({
      error_message: 'That user was not be found',
    });
  }

  req.params.userId = user._id.toString();
  return next();
};

const isDoctorOrOwner = async (req, res, next) => {
  const myUserId = getLoggedInUserId(req);
  const reqUserId = getRequestedUserId(req);

  if (myUserId && reqUserId) {
    // check if owner
    if (myUserId === reqUserId) {
      return next();
    }

    // check if doctor
    if (req.user.user_type === 'doctor') {
      return next();
    }
  }
  return res.status(401).json(unAuthorizedResponse);
};

const isDoctor = async (req, res, next) => {
  const myUserId = getLoggedInUserId(req);

  if (myUserId) {
    if (req.user.user_type === 'doctor') {
      return next();
    }
  }

  return res.status(401).json(unAuthorizedResponse);
};

const passportInit = app => {
  app.use(passport.initialize());
  passport.use(strategyJwtLogin);
  passport.use(strategyLocalLogin);
};

module.exports = {
  passportInit,
  useLocalLogin,
  localSendToken,
  requireAuth,
  isOwner,
  isDoctorOrOwner,
  isDoctor,
  setIdByUsername,
};

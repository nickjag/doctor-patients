const jwt = require('jwt-simple');
const nodeErr = require('node-err');
const config = require('../config');

const sanitizeString = (str, pattern) => str.replace(pattern, '');
const matchUsername = /[^a-zA-Z0-9]/gi;

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user.id,
      ver: user.login_version,
      iat: timestamp,
    },
    config.TOKEN_SECRET,
  );
};

const mapUserForResponse = (user, token = null) => ({
  id: user._id,
  userType: user.user_type,
  username: user.username,
  name: `${user.user_data.first_name} ${user.user_data.last_name}`,
  ...(token ? { token } : {}),
});

const distinctArr = arr => {
  const map = {};
  const newArr = [];

  for (const ele of arr) {
    if (typeof map[ele] === 'undefined') {
      map[ele] = true;
      newArr.push(ele);
    }
  }
  return newArr;
};

const mapUserPatientForResponse = user => ({
  id: user._id,
  firstName: user.user_data.first_name,
  lastName: user.user_data.last_name,
  email: user.user_data.email,
  phoneNumber: user.user_data.phone_number,
  address: user.user_data.address,
  city: user.user_data.city,
  state: user.user_data.state,
});

const mapUserPatientAllForResponse = user => ({
  id: user._id,
  username: user.username,
  firstName: user.user_data.first_name,
  lastName: user.user_data.last_name,
  email: user.user_data.email,
  city: user.user_data.city,
});

const censorErrors = (err, req, res, next) => {
  nodeErr.stop(err, { req, censor: true });
  return next(err);
};

const getLoggedInUserId = req => (req.user && req.user.id ? req.user.id : null);

const getRequestedUserId = req => req.params.userId || null;

module.exports = {
  sanitizeString,
  matchUsername,
  tokenForUser,
  censorErrors,
  distinctArr,
  mapUserForResponse,
  mapUserPatientForResponse,
  mapUserPatientAllForResponse,
  getLoggedInUserId,
  getRequestedUserId,
};

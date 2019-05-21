const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { TOKEN_SECRET } = require('../../config');

const UserService = require('../../services/user.js');

const options = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: TOKEN_SECRET,
};

const verifyCallback = async (payload, done) => {
  let user;

  try {
    user = await UserService.findById(payload.sub);
  } catch (err) {
    return done(err, false);
  }

  return !user ? done(null, false) : done(null, user);
};

// create JWT strategy
const strategyJwtLogin = new JwtStrategy(options, verifyCallback);

const requireAuth = passport.authenticate('jwt', {
  session: false,
});

module.exports = {
  strategyJwtLogin,
  requireAuth,
};

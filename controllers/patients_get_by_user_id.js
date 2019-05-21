const nodeErr = require('node-err');
const UserService = require('../services/user');
const { mapUserPatientForResponse } = require('../includes/utils');

module.exports = async (req, res, next) => {
  const { userId } = req.params;

  let user;

  try {
    user = await UserService.findById(userId);
  } catch (err) {
    nodeErr.stop(err, { req });
    return next(err);
  }

  if (!user || user.user_type !== 'patient') {
    return res.status(404).send({
      error_message: 'That patient could not be found',
    });
  }

  return res.send(mapUserPatientForResponse(user));
};

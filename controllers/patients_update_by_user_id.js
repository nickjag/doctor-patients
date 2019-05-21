const nodeErr = require('node-err');
const PatientService = require('../services/patient');
const UserService = require('../services/user');
const { mapUserPatientForResponse } = require('../includes/utils');

module.exports = async (req, res, next) => {
  const { userId } = req.params;
  let patient;

  try {
    patient = await PatientService.findByUserId(userId);
  } catch (err) {
    nodeErr.stop(err, { req });
    return next(err);
  }

  if (!patient) {
    return res.status(404).send({
      error_message: 'That patient could not be found',
    });
  }

  const {
    address,
    age,
    city,
    email,
    firstName,
    lastName,
    phoneNumber,
    state,
  } = req.body;

  patient.address = address || patient.address;
  patient.age = age || patient.age;
  patient.city = city || patient.city;
  patient.email = email || patient.email;
  patient.first_name = firstName || patient.first_name;
  patient.last_name = lastName || patient.last_name;
  patient.phone_number = phoneNumber || patient.phone_number;
  patient.state = state || patient.state;

  try {
    await patient.save();
  } catch (err) {
    nodeErr.stop(err, { req });
    return next(err);
  }

  let user;

  try {
    user = await UserService.findById(userId);
  } catch (err) {
    nodeErr.stop(err, { req });
    return next(err);
  }

  return res.send(mapUserPatientForResponse(user));
};

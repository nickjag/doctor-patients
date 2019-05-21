const nodeErr = require('node-err');
const url = require('url');
const PatientService = require('../services/patient');
const { mapUserPatientAllForResponse } = require('../includes/utils');

module.exports = async (req, res, next) => {
  const urlParts = url.parse(req.url, true);
  const { page, search } = urlParts.query;

  const pageNum = page || 1;

  let userPatients;

  try {
    userPatients = await PatientService.findAll(pageNum, search);
  } catch (err) {
    nodeErr.stop(err, { req });
    return next(err);
  }

  if (!userPatients || !userPatients.length) {
    return res.status(404).send({
      error_message: 'No patients were found.',
    });
  }

  const response = {
    patients: userPatients.map(userPatient =>
      mapUserPatientAllForResponse(userPatient),
    ),
  };

  return res.send(response);
};

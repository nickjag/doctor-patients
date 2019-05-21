const express = require('express');
const nodeErr = require('node-err');
const users = require('./users');
const patients = require('./patients');

const router = express.Router();

router.use('/users', users);

router.use('/patients', patients);

router.use('/', (req, res, next) => {
  const err = new Error('Not found');

  nodeErr.stop(err, {
    req,
    status: 404,
    responses: {
      error_type: 'not-found',
      error_message: 'That endpoint was not found.',
    },
  });
  return next(err);
});

module.exports = router;

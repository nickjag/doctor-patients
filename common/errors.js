const nodeErr = require('node-err');

module.exports = (err, req, res, next) => {
  if (!err._response) {
    nodeErr.stop(err, {
      req,
      responses: {
        error_type: 'unknown',
        error_message: 'Oops! Something went wrong.',
      },
    });
  }

  const statusCode = nodeErr.getStatus(err);
  const outputResponse = nodeErr.getResponse(err);

  return res.status(statusCode).send(outputResponse);
};

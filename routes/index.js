const express = require('express');
const api = require('./api');

const router = express.Router();

router.use('/api', api);

router.get('/*', (req, res) => {
  res.sendFile('../app/build/index.html');
});

module.exports = router;

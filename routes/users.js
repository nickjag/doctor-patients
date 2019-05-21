const { Router } = require('express');
const { censorErrors } = require('../includes/utils');

const { useLocalLogin, localSendToken } = require('../common/passport');

const router = Router();

// login user

router.post('/login', useLocalLogin, localSendToken, censorErrors);

module.exports = router;

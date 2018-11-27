const express = require('express');
const router = express.Router();
const authCntrl = require("../controllers/authCntrl");
const { catchErrors } = require("../handlers/errorHandlers");
const { validate } = require("../handlers/middleware");

router.get('/login', authCntrl.login);

router.post('/login', authCntrl.loginPOST);

router.get('/logout', authCntrl.logout);

router.get('/account/reset/:token', authCntrl.reset);

router.post('/account/reset/:token', validate.password, authCntrl.resetPWD);

router.post('/account/forgot', catchErrors(authCntrl.forgot));

module.exports = router;
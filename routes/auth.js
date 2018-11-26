const express = require('express');
const router = express.Router();
const authCntrl = require("../controllers/authCntrl");
const { catchErrors } = require("../handlers/errorHandlers");
const { validate } = require("../handlers/middleware");

router.get('/login', authCntrl.login);

router.get('/logout', authCntrl.logout);

router.post('/login', authCntrl.loginPOST);

module.exports = router;
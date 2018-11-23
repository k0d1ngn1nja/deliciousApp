const express = require('express');
const router = express.Router();
const userCntrl = require("../controllers/userCntrl");
const { catchErrors } = require("../handlers/errorHandlers");
const { validate } = require("../handlers/middleware");

router.get('/login', userCntrl.login);

router.post('/login', userCntrl.loginPOST);

router.get('/register', userCntrl.register);

router.post('/register', validate.registration);

module.exports = router;
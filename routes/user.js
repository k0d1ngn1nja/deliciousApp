const express = require('express');
const router = express.Router();
const userCntrl = require("../controllers/userCntrl");
const authCntrl = require("../controllers/authCntrl");
const { catchErrors } = require("../handlers/errorHandlers");
const { validate } = require("../handlers/middleware");

router.get('/register', userCntrl.register);

router.post('/register', validate.registration, userCntrl.registerPOST, authCntrl.loginPOST);

module.exports = router;
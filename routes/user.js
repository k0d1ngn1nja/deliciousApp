const express = require('express');
const router = express.Router();
const userCntrl = require("../controllers/userCntrl");
const authCntrl = require("../controllers/authCntrl");
const { catchErrors } = require("../handlers/errorHandlers");
const { validate, isLoggedIn } = require("../handlers/middleware");

router.get('/account', isLoggedIn, userCntrl.account);

router.get('/register', userCntrl.register);

router.post('/account', isLoggedIn, catchErrors(userCntrl.updateAccount));

router.post('/register', validate.registration, userCntrl.registerPOST, catchErrors(authCntrl.loginPOST));

module.exports = router;
const express = require('express');
const router = express.Router();
const storeCntrl = require("../controllers/storeCntrl");
const { catchErrors } = require("../handlers/errorHandlers");

router.get('/', storeCntrl.homePage);

router.get('/add-store', storeCntrl.addStore);

router.post('/add-store', catchErrors(storeCntrl.create));

module.exports = router;

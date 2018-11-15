const express = require('express');
const router = express.Router();
const storeCntrl = require("../controllers/storeCntrl");

// Do work here
router.get('/', storeCntrl.homePage);

module.exports = router;

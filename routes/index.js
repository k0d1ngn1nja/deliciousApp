const express = require('express');
const router = express.Router();
const storeCntrl = require("../controllers/storeCntrl");

router.get('/', storeCntrl.homePage);

router.get('/add-store', storeCntrl.addStore);

router.post('/add-store', storeCntrl.create);

module.exports = router;

const express = require('express');
const router = express.Router();
const storeCntrl = require("../controllers/storeCntrl");
const { catchErrors } = require("../handlers/errorHandlers");

router.get('/', catchErrors(storeCntrl.getStores));

router.get('/stores', catchErrors(storeCntrl.getStores));

router.get('/add-store', storeCntrl.addStore);

router.get('/stores/:id/edit', catchErrors(storeCntrl.editStore));

router.post('/store', catchErrors(storeCntrl.createStore));

router.post('/store/:id', catchErrors(storeCntrl.updateStore));

module.exports = router;

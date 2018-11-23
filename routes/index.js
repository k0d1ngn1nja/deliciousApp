const express = require('express');
const router = express.Router();
const { imgResize, imgUpload } = require("../handlers/middleware");
const storeCntrl = require("../controllers/storeCntrl");
const { catchErrors } = require("../handlers/errorHandlers");

router.get('/', catchErrors(storeCntrl.getStores));

router.get('/add-store', storeCntrl.addStore);

router.get('/stores', catchErrors(storeCntrl.getStores));

router.get('/stores/:slug', catchErrors(storeCntrl.getStore));

router.get('/stores/:id/edit', catchErrors(storeCntrl.editStore));

router.post('/store', 
	imgUpload, 
	catchErrors(imgResize), 
	catchErrors(storeCntrl.createStore)
);

router.post('/store/:id', 
	imgUpload, 
	catchErrors(imgResize),
	catchErrors(storeCntrl.updateStore)
);

router.get("/tags", catchErrors(storeCntrl.getStoreByTags));
router.get("/tags/:tag", catchErrors(storeCntrl.getStoreByTags));

module.exports = router;

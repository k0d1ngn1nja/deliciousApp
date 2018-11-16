const Store = require("../models/Store");

const storeContrl = {
	homePage: (req, res, next) =>{
  	return res.render("index", {title: "Home | ThatsDeliciousApp"});
	},

	addStore: (req, res, next) =>{
		res.render("store/form", {title: "Add Store"});
	},

	create: (req, res, next) =>{
		console.log(req.body);
		// res.json(req.body);
	},
}

module.exports = storeContrl;
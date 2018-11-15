const Store = require("../models/Store");

const storeContrl = {
	homePage: (req, res, next) =>{
  	return res.render("index", {title: "Home | ThatsDeliciousApp"});
	}
}

module.exports = storeContrl;
const mongoose = require("mongoose");
// const User = mongoose.model("User");

const userContrl = {
	login: (req, res, next) =>{
		res.render("auth/login", {title: "Login"});
	},

	loginPOST: (req, res, next) =>{

	},

	register: (req, res, next) =>{
		res.render("auth/register", {title: "Register"});
	},

	// registerPOST: (req, res, next) =>{
	// 	res.json(req.body);
	// }
};

module.exports = userContrl;
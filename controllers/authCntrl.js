const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");

const authContrl = {
	login: (req, res, next) =>{
		res.render("auth/login", {title: "Login"});
	},

	loginPOST: passport.authenticate("local", {
		failureRedirect: "/login",
		failureFlash: "Failed Login",
		successRedirect: "/",
		successFlash: "You are ow logged in."
	}),
};

module.exports = authContrl;
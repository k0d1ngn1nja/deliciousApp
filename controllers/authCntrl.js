const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const crypto = require("crypto");
const promisify = require("es6-promisify");

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

	logout: (req, res, next) =>{
		req.logout();
		req.flash("success", "You are now logged out!");
		return res.redirect("/");
	},

	forgot: async (req, res, next) =>{
		const user = await User.findOne({email: req.body.email});
		if(!user){
			req.flash("error", "No account with that email exists.");
			return res.redirect("/login");
		};
		user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
		user.resetPasswordExp = Date.now() + 3600000;

		await user.save();
		req.flash("success", "A password reset token has been email to you.");
		return res.redirect("/login")
	},

	reset: async (req, res, next) =>{
		const user = await User.findOne({
			resetPasswordToken: req.params.token,
			resetPasswordExp: { $gt: Date.now() }
		});

		if(!user){
			req.flash("error", "Password reset is invalid or has expired!");
			return res.redirect("/login");
		};

		res.render("auth/reset", {title: "Reset Your Password"});
	},

	resetPWD: async (req, res, next) =>{
		const user = await User.findOne({
			resetPasswordToken: req.params.token,
			resetPasswordExp: { $gt: Date.now() }
		});

		const setPassword = promisify(user.setPassword, user);
		await setPassword(req.body.password);
		user.resetPasswordToken = undefined;
		user.resetPasswordExp = undefined;

		const _updated_user = await user.save();
		await req.login(_updated_user);
		req.flash("success", "Your password has been reset.");
		return res.redirect("/");
	}
};

module.exports = authContrl;
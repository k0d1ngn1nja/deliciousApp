const mongoose = require("mongoose");
const User = mongoose.model("User");
const promisify = require("es6-promisify");

const userContrl = {
	register: (req, res, next) =>{
		res.render("auth/register", {title: "Register"});
	},

	registerPOST: async (req, res, next) =>{
		const user = new User({email: req.body.email, name: req.body.name});
		const registerWithPromise = promisify(User.register, User);
		await registerWithPromise(user, req.body.password);
		return next(); //pass to login action in authController 
	},

	account: (req, res, next) =>{
		res.render("user/account", { title: "Edit your account."});
	},

	updateAccount: async (req, res, next) =>{
		const updates = {
			name: req.body.name,
			email: req.body.email
		};

		const user = await User.findOneAndUpdate(
			{ _id: req.user._id }, 
			{ $set: updates }, 
			{ new: true, runValidators: true, context: "query" }
		);

		req.flash("success", "Updated your profile.");
		return res.redirect("back");
	}
};

module.exports = userContrl;
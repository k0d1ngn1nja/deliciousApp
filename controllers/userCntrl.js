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
		next(); //pass to login action in authController 
	}
};

module.exports = userContrl;
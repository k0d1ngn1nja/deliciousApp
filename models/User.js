const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const md5 = require("md5");
const validator = require("validator");
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: [true, "Please provide an email address."],
		validate: [validator.isEmail, "Invalid Email Address."]
	},
	name: {
		type: String,
		required: [true, "Please provide a name"],
		trim: true
	},
	resetPasswordToken: String,
	resetPasswordExp: Date,
	likes: [{type: mongoose.Schema.ObjectId, ref: "Store"}]
});

userSchema.virtual('gravatar').get(function(){
	const hash = md5(this.email);
	return `https://gravatar.com/avatar/${hash}?s=200`;
})

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongodbErrorHandler)
module.exports = mongoose.model("User", userSchema);
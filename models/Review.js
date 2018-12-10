const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const reviewSchema = new Schema({
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, "You must supply an author"]
	},
	store: {
		type: mongoose.Schema.ObjectId,
		ref: "Store",
		required: [true, " You must supply a store"]
	},
	text: {
		type: String,
		required: [true, 'Your review must have text']
	},
	rating:{
		type: Number,
		min: 1,
		max: 5
	}
}, {timestamps: true});


module.exports = mongoose.model("Review", reviewSchema);
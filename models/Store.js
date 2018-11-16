const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("slugs");

const storeSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, "Store name is required"]
	},
	slug: String,
	description:{
		type: String,
		trim: true
	},
	tags: [String]
});

storeSchema.pre("save", function(next){
	if(!this.isModified("name")){
		return next();
	};
	
	this.slug = slug(this.name);
	next();
});

module.exports = mongoose.model('Store', storeSchema);
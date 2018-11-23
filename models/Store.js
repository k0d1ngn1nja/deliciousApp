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
	tags: [String],
	location: {
		type: {
			type: String,
			default: "Point",
		},
		coordinates: [{type: Number, required: [true, "Coordinates are required!"]}],
		address: {
			type: String,
			required: [true, "Address must be provided!"]
		}
	},
	photo: String
},{timestamps: true});

storeSchema.pre("save", async function(next){
	if(!this.isModified("name")){
		return next();
	};
	
	this.slug = slug(this.name);
	
	const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
	const storeWithSlug = await this.constructor.find({slug: slugRegEx});
	
	if(storeWithSlug.length){
		this.slug = `${this.slug}-${storeWithSlug.length + 1}`;
	};
	
	next();
});

storeSchema.statics.getTagsList = function(){
	return this.aggregate([
		{ $unwind: "$tags" },
		{ $group: {_id: "$tags", count: {$sum: 1}} },
		{ $sort: { count: -1 } }
	]);
};

module.exports = mongoose.model('Store', storeSchema);
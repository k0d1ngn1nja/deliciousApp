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
	photo: String,
	author: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: "You must provide and author"
	}
},{timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}});

// defines indexes to help when searching
storeSchema.index({
	name: "text",
	description: "text"
});

storeSchema.index({location: "2dsphere"});

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

storeSchema.statics.getTopStores = function(){
	return this.aggregate([
		// look up stores and populate their reviews
		{ $lookup: {
				from: 'reviews', localField: '_id', 
				foreignField: 'store', as: 'reviews'
		}},
		// filter for only items taht have 2 or more reviews
		{ $match: {
			'reviews.1': { $exists: true }
		}},
		// add the average reviews field
		{ $project: {
			photo: '$$ROOT.photo',
			name: '$$ROOT.name',
			slug: '$$ROOT.slug',
			reviews: '$$ROOT.reviews',
			averageRating: { $avg: '$reviews.rating' }
		}},
		// sort it by our new field, highes reviews first
		{ $sort: { averageRating: -1 } },
		// limit to at most 10 stores
		{ $limit: 10 }
	]);
};

// find reviews where stores _id property === reviews store property
storeSchema.virtual('reviews', {
	ref: 'Review', //what model to link
	localField: '_id', //which field on the store
	foreignField: 'store' //which field on the review
});

function autopopulate(next){
	this.populate('reviews');
	next();
};

storeSchema.pre('find', autopopulate);
storeSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Store', storeSchema);
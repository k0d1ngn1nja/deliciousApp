const mongoose = require("mongoose");
const Store = mongoose.model("Store");

const storeContrl = {
	homePage: (req, res, next) =>{
  	return res.render("index", {title: "Home | ThatsDeliciousApp"});
	},

	getStore: async (req, res, next) =>{
		const { slug } = req.params;
		const store = await Store.findOne({ slug });
		if(!store) return next();
		res.render("store/show", {title: store.name, store})
	},

	addStore: (req, res, next) =>{
		res.render("store/form", {title: "Add Store"});
	},

	createStore: async (req, res, next) =>{
		const store = new Store(req.body);
		await store.save();
		req.flash("success", `Successfully Created ${store.name}. Care to drop a review?`);
		res.redirect(`/store/${store.slug}`);
	},

	editStore: async (req, res, next) =>{
		const { id } = req.params;
		const store = await Store.findOne({_id: id});
		res.render("store/form", { title: `Edit ${store.name}`, store});
	},

	updateStore: async (req, res, next) =>{
		const { id } = req.params;
		//set the location data to be a point
		req.body.location.type = "Point";
		const store = await Store.findOneAndUpdate({_id: id}, req.body, {
			new: true,
			runValidators: true
		}).exec();
		req.flash("success", `Successfully updated ${store.name}.`);
		res.redirect(`/store/${store._id}/edit`);
	},

	getStores: async (req, res, next) =>{
		const stores = await Store.find();
		res.render("store/index", {title: "Stores", stores});
	}
}

module.exports = storeContrl;
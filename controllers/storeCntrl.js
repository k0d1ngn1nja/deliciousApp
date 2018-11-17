const mongoose = require("mongoose");
const Store = mongoose.model("Store");

const storeContrl = {
	homePage: (req, res, next) =>{
  	return res.render("index", {title: "Home | ThatsDeliciousApp"});
	},

	addStore: (req, res, next) =>{
		res.render("store/form", {title: "Add Store"});
	},

	create: async (req, res, next) =>{
		const store = new Store(req.body);
		await store.save();
		req.flash("success", `Successfully Created ${store.name}. Care to drop a review?`);
		res.redirect(`/store/${store.slug}`);
	},

	getStores: async (req, res, next) =>{
		const stores = await Store.find();
		res.render("store/index", {title: "Stores", stores});
	}
}

module.exports = storeContrl;
const mongoose = require("mongoose");
const Store = mongoose.model("Store");

const storeContrl = {
	homePage: (req, res, next) =>{
		req.flash("info", "Something happened!!");
  	return res.render("index", {title: "Home | ThatsDeliciousApp"});
	},

	addStore: (req, res, next) =>{
		res.render("store/form", {title: "Add Store"});
	},

	create: async (req, res, next) =>{
		const store = new Store(req.body);
		await store.save();
		req.flash("success", `Successfully Created ${store.name}. Care to lease a review?`);
		res.redirect("/");
	},
}

module.exports = storeContrl;
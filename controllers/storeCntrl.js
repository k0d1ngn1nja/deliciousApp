const mongoose = require("mongoose");
const Store = mongoose.model("Store");
const { isStoreOwner } = require("../handlers/middleware");

const storeContrl = {
	homePage: (req, res, next) =>{
  	return res.render("index", {title: "Home | ThatsDeliciousApp"});
	},

	getStore: async (req, res, next) =>{
		const { slug } = req.params;
		const store = await Store.findOne({ slug }).populate("author");
		if(!store) return next();
		res.render("store/show", {title: store.name, store})
	},

	addStore: (req, res, next) =>{
		res.render("store/form", {title: "Add Store"});
	},

	createStore: async (req, res, next) =>{
		req.body.author = req.user._id;
		const store = new Store(req.body);
		await store.save();
		req.flash("success", `Successfully Created ${store.name}. Care to drop a review?`);
		res.redirect(`/store/${store.slug}`);
	},

	editStore: async (req, res, next) =>{
		const { id } = req.params;
		const store = await Store.findOne({_id: id});
		isStoreOwner(store, req.user);
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
	},

	getStoreByTags: async (req, res, next) =>{
		const tag = req.params.tag;
		const tagQuery = tag || {$exists: true};
		const tagsPromise = Store.getTagsList();
		const storesPromise = Store.find({tags: tagQuery});

		const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);
		res.render("tags", { tags, title: "Tags", tag, stores});
	},

	searchStores: async (req, res, next) =>{
		const stores = await Store.find({
			$text: {
				$search: req.query.q
			}
		}, { score: { $meta: "textScore" }}).sort({
			score: { $meta: "textScore"}
		}).limit(5);
		res.json(stores);
	},

	viewMap: (req, res, next) =>{
		res.render("store/map", {title: "Map"});
	},

	mapStores: async (req, res, next) =>{
		const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
		const q = {
			location:{
				$near: {
					$geometry: {
						type: "Point",
						coordinates
					},
					$maxDistance: 10000 //10km
				}
			}
		};

		const stores = await Store.find(q).select("slug name description location").limit(10);
		return res.json(stores);
	}
}

module.exports = storeContrl;
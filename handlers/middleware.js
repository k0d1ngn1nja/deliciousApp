const multer = require("multer");
const jimp = require("jimp");
const uuid = require("uuid");

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next){
		const isPhoto = file.mimetype.startsWith("image/");
		if(isPhoto){
			next(null, true);
		} else {
			next({message: "That filetype isn't allowed!"}, false);
		};
	}
};

// Image Upload Middleware
exports.imgUpload = multer(multerOptions).single('photo');

exports.imgResize = async (req, res, next) =>{
	if(!req.file){
		return next();
	};

	const fileExt = req.file.mimetype.split("/")[1];
	req.body.photo = `${uuid.v4()}.${fileExt}`;
	// image resizing
	const photo = await jimp.read(req.file.buffer);
	await photo.resize(600, jimp.AUTO);
	await photo.write(`./public/uploads/${req.body.photo}`);

	next();
};

// VALIDATIONs
exports.validate = {
	registration: (req, res, next) =>{
		req.sanitizeBody("name");
		req.checkBody("name", "You must provide a name!").notEmpty();
		req.checkBody("email", "Email is not valid!").isEmail();
		req.sanitizeBody("email").normalizeEmail({
			remove_dot: false,
			remove_extension: false,
			gmail_remove_subaddress: false
		});
		req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
	  req.checkBody('cpassword', 'Confirmed Password cannot be blank!').notEmpty();
	  req.checkBody('cpassword', 'Oops! Your passwords do not match').equals(req.body.password);

	  const errors = req.validationErrors();
	  if(errors){
	  	req.flash("error", errors.map(err => err.msg));
	  	return res.render("auth/register", {title: "Register", flashes: req.flash() });
	  };

	  next(); //there were no errors
	},

	password: (req, res, next) =>{
		if(req.body.password === req.body.cpassword){
			return next();
		};
		req.flash("error", "Passwords don't match!");
		return res.redirect("back");
	}
};

//AUTH MIDDLEWARE
exports.isLoggedIn = (req, res, next) =>{
	if(req.isAuthenticated()){
		return next();
	};

	req.flash("error", "Oops you must be logged in to perform that action.");
	return res.redirect("/login");
};

exports.isStoreOwner = (store, user) =>{
	if(!store.author.equals(user._id)){
		throw Error("You must own this store to edit it!");
	};
}
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
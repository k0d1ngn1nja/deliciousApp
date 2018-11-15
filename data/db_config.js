const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.MONGO_URI, {
	user: process.env.DB_USER, 
	pass: process.env.DB_PASS
}).then(() => {
	console.log("Connected to Database")
}).catch((err) =>{
	return console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
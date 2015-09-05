var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Day = new Schema({
	morning: String,
	afternoon: String,
	evening: String,
	date: Date
});

var userSchema = new Schema({
	email: {type: String, required: true},
	passwordDigest: {type: String, required: true},
	createdAt: {type: Date, default: Date.now()},
	days: [Day]
});

var Day = mongoose.model("Day", Day);
var User = mongoose.model("User", userSchema);

module.exports = User;
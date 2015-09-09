var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var Day = new Schema({
	morning: String,
	afternoon: String,
	evening: String,
	date: Date
});

var userSchema = new Schema({
	email: {
		type: String, 
		required: true, 
		index: {
			unique: true
		}
	},
	passwordDigest: {
		type: String, 
		required: true
	},
	createdAt: {
		type: Date, 
		default: Date.now()
  },
	days: [Day]
});

// create a new user with secure (hashed) password (for sign up)
userSchema.statics.createSecure = function (email, password, cb) {
  // `_this` now references our schema
  var _this = this;
  // generate some salt
  bcrypt.genSalt(function (err, salt) {
    // hash the password with the salt
    bcrypt.hash(password, salt, function (err, hash) {
      // build the user object
      var user = {
        email: email,
        passwordDigest: hash
      };
      // create a new user in the db with hashed password and execute the callback when done
      _this.create(user, cb);
    });
  });
};

// authenticate user (for login)
userSchema.statics.authenticate = function (email, password, cb) {
  // find user by email entered at log in
  this.findOne({email: email}, function (err, user) {
    // throw error if can't find user
    if (user === null) {
      cb("Can\'t find user with that email", null);
    // if found user, check if password is correct
    } else if (user.checkPassword(password)) {
      // the user is found & password is correct, so execute callback
      // pass no error, just the user to the callback
      cb(null, user);
    } else {
      // user found, but password incorrect
      cb("Password incorrect", null)
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
userSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password to compare with stored `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

var Day = mongoose.model("Day", Day);
var User = mongoose.model("User", userSchema);

module.exports = User;
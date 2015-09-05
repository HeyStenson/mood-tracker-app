var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mood_tracker');
module.exports.User = require('./user');
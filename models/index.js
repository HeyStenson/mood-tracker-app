var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/moodhue_app');
module.exports = require('./user');
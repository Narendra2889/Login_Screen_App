var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var OTPSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	OTP: {
		type: Number
    },
    tries: {
        type: Number
    }
});



var OTP = module.exports = mongoose.model('OTP', OTPSchema);


module.exports.getOTP = function(username, callback) {
    var query = {username: username};
	OTP.findOne(query, callback);
}

module.exports.incrementTries = function(username, callback) {
    var query = {username: username};
	OTP.findOne(query, callback);
}
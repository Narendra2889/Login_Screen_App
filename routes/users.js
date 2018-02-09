var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

var OTP = require('../models/otp');

// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Login
router.get('/login', function(req, res){
	res.render('login');
});

// Register User
router.post('/register', function(req, res){
	var email = req.body.email;
	var password = req.body.password;

	req.checkBody('email', 'email is required').notEmpty();
	req.checkBody('email', 'email is required').isEmail();
	req.checkBody('password', 'password is required').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		var newUser = new User({
			username : email,
			password: password
		});

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		var newOTP = new OTP({
			username: email,
			OTP: getRandomInt(0,99),
			tries: 0
		});

		newOTP.save(function() {});

		User.createUser(newUser, function(err, user) {
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered, You can login now');
		res.redirect('/users/login');
	}

});

passport.use(new LocalStrategy(
  function(username, password, done) {
		console.log("Local Strategy: " , username, password);
   User.getUserByUsername(username, function(err, user){
		 if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// router.post('/login', function(req,res) {
// 	console.log(req.body);
// });

router.post('/checkotp', function(req,res) {
	console.log(req.user);
		OTP.getOTP(req.user.username, function(err, otp) {
				if(otp.tries == 3) {
					req.logout();
					req.flash('success_msg', 'You are logged out');
					
						res.redirect('/users/login');
				}
				else {
					otp.tries += 1;
					otp.save();
				}
		});
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/home', failureRedirect:'/register',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;
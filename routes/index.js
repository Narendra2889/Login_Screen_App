var express = require('express');
var router = express.Router();


router.get('/',ensureAuthenticated, function(req,res) {
	res.render('home');
});

router.get('/home', function(req,res) {
	res.render('home');
});

router.get('/login', function(req, res){
	res.render('login');
});


router.get('/register', function(req,res) {
	res.render('register', {messages: req.flash('success_msg')});
})

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
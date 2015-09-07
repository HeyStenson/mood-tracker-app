var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//moment.js for time
var moment = require('moment');
moment().format();

var views = path.join(process.cwd(), 'views/');
var db = require('./models');
var session = require('express-session');

// serve js & css files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// body parser config to accept all datatypes
app.use(bodyParser.urlencoded({extended: true}));
// parse cookie data
app.use(cookieParser('Super Secret'));

//create a session
app.use(
  session({
    secret: 'super-secret-private-keyyy',
    resave: false,
    saveUninitialized: true,
  })
);

//extending the req object to help manage sessions
app.use(function(req, res, next){
  //log a user in
  req.login = function(user){
    req.session.userId = user._id;
  };
  //find the current user
  req.currentUser = function(cb){
    db.User.findOne({_id: req.session.userId},
      function(err, user){
        req.user = user;
        cb(null, user)
      })
  };
  //logout the current user
  req.logout = function(){
    req.session.userId = null;
    req.user = null;
  }
  //call the next middleware in the stack
  next();
});

// parse cookie data
var cookieParser = require("cookie-parser");
app.use(cookieParser()); 

//set the view engine to ejs
//app.set('view engine', 'ejs');

//routes
app.get('/', function (req, res){
  var index = path.join(views, 'index.html');
	res.sendFile(index);
});

app.get("/login", function(req, res){
  var login_form = path.join(views, "login.html");
  res.sendFile(login_form);
});

app.get("/signup", function(req, res){
  var signup_form = path.join(views, "signup.html");
  res.sendFile(signup_form);
});

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

//API endpoints
//Sign up new user
app.post(["/signup", "/api/users"], function createUser(req, res){
  console.log("Looks like you're trying to signup!");
  var email = req.body.email;
  var passwordDigest = req.body.passwordDigest;
  db.User.createSecure(email, passwordDigest, function(err, newUser){
    if (newUser){
      console.log(newUser.email + " is registered");
      res.cookie("guid", newUser._id, { signed: true });
      res.redirect('/')
    } else {
      console.log(err);
      res.redirect('/signup')
    }
  });
});

//Log in existing user
app.post(["/login", "/api/sessions"], function createSession(req, res){
  console.log("Looks like you're trying to log in!");
  var email = req.body.email;
  var passwordDigest = req.body.passwordDigest;
  db.User.authenticate(email, passwordDigest, function(err, user){
    if (user){
      res.cookie('guid', user._id, {signed: true});
      res.redirect('/')
    } else {
      console.log(err);
      res.redirect('/signup');
    }
  })
});

//listen up
app.listen(3000, function(){
  console.log("Server running on localhost:3000");
})
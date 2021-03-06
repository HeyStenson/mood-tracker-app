var express = require('express');
var app = express();
var path = require('path');
var _ = require('underscore');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var ejs = require('ejs');

//moment.js for time
var moment = require('moment');
moment().format();
app.locals.moment = require("moment");

var views = path.join(process.cwd(), 'views/');
var db = require('./models');
var session = require('express-session');

// serve js & css files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// body parser config to accept all datatypes
app.use(bodyParser.urlencoded({extended: true}));

//create a session
app.use(
  session({
    secret: 'good-mood-happy-time',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(methodOverride("_method"));

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

//set the view engine to ejs
app.set('view engine', 'ejs');

//routes
app.get('/', function (req, res){
  console.log(req.session);
  req.currentUser(function (err, user) {
    if (user === null) {
      res.redirect("/login");
    } else {
      var index = path.join(views, 'index.html');
      res.sendFile(index);
    }
  });
});

app.get("/login", function(req, res){
  //console.log(req.session);
  var login_form = path.join(views, "login.html");
  res.sendFile(login_form);
});

app.get("/signup", function(req, res){
  var signup_form = path.join(views, "signup.html");
  res.sendFile(signup_form);
});

app.get('/history', function(req, res){
  req.currentUser(function (err, user) {
    if (user === null) {
      res.redirect("/login");
    } else {
      res.render("/history", {moods: user.moods});
    }
  });
});

//API endpoints
//Sign up new user
app.post(["/signup", "/api/users"], function createUser(req, res){
  var email = req.body.email;
  var passwordDigest = req.body.passwordDigest;
  console.log("Signup", email, passwordDigest);
  db.User.createSecure(email, passwordDigest, function(err, newUser){
    if (newUser){
      req.login(newUser);
      res.redirect('/')
    } else {
      console.log(err);
      res.redirect('/signup');
    }
  });
});

//Log in existing user
app.post(["/login", "/api/sessions"], function createSession(req, res){
  console.log("REQ-----", req.body);
  var email = req.body.email;
  var passwordDigest = req.body.passwordDigest;
  console.log("LOGIN:", email, passwordDigest);
  db.User.authenticate(email, passwordDigest, function(err, user){
    if (user){
        req.login(user);
        console.log("User exists, going to /");
        res.send('/');
    } else {
      console.log("ERROR", err);

      res.status(404).send(err); // display message
    }
  })
});

//push moods to user object and redirect to /history
app.post('/history', function(req, res){
  var moodString = req.body.moodInput;
  req.currentUser(function(err, user){
    var moodNow = new db.Mood();
    moodNow.mood = moodString;
    user.moods.push(moodNow);
    user.save(function(err){
      if (err){
        return console.log(err, moodNow);
      } else {
        res.render("history", {moods: user.moods});
      }
    })
  })
})

//Log user out
app.delete(['/logout','/api/sessions' ], function (req, res){
  req.logout();
  res.redirect('/login');
});

//listen up
app.listen(process.env.PORT || 3000);






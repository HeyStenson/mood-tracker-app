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
    secret: 'super-secret-private-keyyy',
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
      var history = path.join(views, 'history.html');
      res.sendFile(history);
    }
  });
});

//can I render users to a page?
app.get('/api/users', function(req, res){
  db.User.find({}, function(err, success){
    if (err){
      return console.log(err);
    }
    res.send(success);
  });
})

//API endpoints
//Sign up new user
app.post(["/signup", "/api/users"], function createUser(req, res){
  //console.log("A signup!");
  var email = req.body.email;
  var passwordDigest = req.body.passwordDigest;
  db.User.createSecure(email, passwordDigest, function(err, newUser){
    if (newUser){
      setUserDay(newUser, function(){
        req.login(newUser);
        console.log(newUser.email + " signed up!");
        res.redirect('/')
      });
    } else {
      console.log(err);
      res.redirect('/signup')
    }
  });
});

//Log in existing user
app.post(["/login", "/api/sessions"], function createSession(req, res){
  var email = req.body.email;
  var passwordDigest = req.body.passwordDigest;
  db.User.authenticate(email, passwordDigest, function(err, user){
    if (user){
      setUserDay(user, function(){
        req.login(user);
          console.log(user + " logged in!");
        res.redirect('/');
      });
    } else {
      console.log(err);
      res.redirect('/login');
    }
  })
});

//Log user out
app.delete(['/logout','/api/sessions' ], function (req, res){
  req.logout();
  res.redirect('/login');
});

var today = moment().dayOfYear();

//after login, check. if day is set, update day; else create a new day
//write function isDayToday -- returns boolean
function setUserDay(user, next){

  if(user.days.length === 0) {
      var day = new db.Day;
      day.date = today;
      user.days.push(day);

      user.save(function(err, newDay){
      if (err){
        console.log(err);
        next(err, newDay);
      } else {
        console.log(newDay + " is the user's first day");
        next(null, newDay);
      }
    })

  } else {

      if(user.days.date !== today) {
        console.log('time to add a new day!');
        var day = new db.Day;
        day.date = today;
        user.days.push(day);

        user.save(function(err, newDay){
        if (err){
          console.log(err);
          next(err, newDay);
        } else {
          console.log(newDay);
          next(null, newDay);
        }
      })

      } else {
        var last_day = user.days[user.days.length-1];
        var diff = last_day.date - today;
        console.log(last_day.date + " was the last time you logged in");
        if (last_day.date && diff === 0)  {
          console.log(user.email + " already has a day!")
          return next(null, last_day);
      }
    }
  }
};

//listen up
app.listen(3000, function(){
  console.log("Server running on localhost:3000");
})

app.post('/history', function(req, res){
  //find user?

  var moodNow = req.body.moodInput;
  console.log(moodNow);

  //match date. only add new mood to today's date

  // if morning day.morning = moodNow; -> user.days.push
  // if afternoon day.afternoon = moodNow;
  // if night day.night = moodNow;
    
  // user.days.push(moodNow);
  // user.day.save(function(err, moodNow){
  //       if (err){
  //         return console.log(err);
  //       } else {
  //         console.log(moodNow + " added successfully!");
  //         res.send(moodNow);
  //       }
  // });
});




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

//API endpoints
//Sign up new user
app.post(["/signup", "/api/users"], function createUser(req, res){
  console.log("A signup!");
  var email = req.body.email;
  var passwordDigest = req.body.passwordDigest;
  db.User.createSecure(email, passwordDigest, function(err, newUser){
    if (newUser){
      req.login(newUser);
      console.log(newUser);
      res.redirect('/')
    } else {
      console.log(err);
      res.redirect('/signup')
    }
  });
});

//Log in existing user
app.post(["/login", "/api/sessions"], function createSession(req, res){
  console.log("A log in!");
  var email = req.body.email;
  var passwordDigest = req.body.passwordDigest;
  db.User.authenticate(email, passwordDigest, function(err, user){
    if (user){
      setUserDay(user, function(){
        console.log(user.days);
        req.login(user);
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

  
  console.log(user.days + " 1"); 
  

  if(user.days.length === 0) {
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

      if(user.days.date && (user.days.date !== today)) {

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
        console.log(last_day.date);
        var diff = last_day.date - today;
        if (last_day.date && diff === 0)  {
        return next(null, last_day);
      }
    }
  }
}
 
// function setUserDay(user){
//   if (!user.days.length) {
//     var day = new db.Day;
//     day.date = today;
//     user.days.push(day);
//   }
//   var last_date = user.days[user.days.length-1].date
//   if (last_date !== today){
//     var day = new db.Day;
//     day.date = today;
//     user.days.push(day);
//     user.save(function(err, newDay){
//       if (err){
//         return console.log(err);
//       }
//       console.log(newDay);
//     })
//   } else {
//     console.log("already has a day");
//   }
// } 

// function setDayMoods(){
//   db.User.findOne({id? && date = today?}, function(err, user){
//     if (err){
//       return console.log(err);
//     }
//     var moodNow = req.body.(value?);
//     // if morning day.morning = moodNow;
//     // if afternoon day.afternoon = moodNow;
//     // if night day.night = moodNow;
//     user.days.push(moodNow);
//     user.save(function(err, user){
//       cb();
//     });
//     user.Day.create(moodNow, function(err, mood){
//     res.send(mood);
//   })
// }

//listen up
app.listen(3000, function(){
  console.log("Server running on localhost:3000");
})

//from Elias
// app.post('/history', function(req, res){
//   var moodNow = req.body;
//   //get current user
//   req.currentUser(function(err, user){
//     // make a new day
//     var what = new db.Day
//     // push the mood into user.days
//     user.days.push()
//     res.send(mood);

//     // setUserDay(user, mood, function(){
//     //   res.send(mood);
//     // })
//   });
//   user.Day.create(moodNow, function(err, mood){
//     res.send(mood);
//   })
// });


//from me
// function setUserDay(user, mood, cb) {
//   var day = new db.Day();
//   day.morning = mood;
//   user.days.push(day);
//   user.save(function(err, user){
//     cb();
//   })
// }


var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
//views path
var views = path.join(process.cwd(), 'views/');
var db = require('./models');
// var session = require('express-session');

// serve js & css files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// body parser config to accept all datatypes
app.use(bodyParser.urlencoded({extended: true}));

// parse cookie data
// var cookieParser = require("cookie-parser");
// app.use(cookieParser()); 

//set the view engine to ejs
//app.set('view engine', 'ejs');

//routes
app.get('/', function (req, res){
	res.sendFile(path.join(views + 'index.html'));
});

app.get("/login", function(req, res){
  var login_form = path.join(views, "login.html");
  res.sendFile(login_form);
});

app.get("/signup", function(req, res){
  var signup_form = path.join(views, "signup.html");
  res.sendFile(signup_form);
});

//API endpoints

app.post(["/signup", "/api/users"], function createUser(req, res){
  console.log("Looks like you're trying to signup!");
  var email = req.body.email;
  var passwordDigest = req.body.passwordDigest;
  db.User.create({email: email, passwordDigest: passwordDigest}, function(err, newUser){
    if (err){return console.log(err);}
    console.log(newUser + "is registered");
    //res.cookie("guid", newUser._id, { signed: true });
    res.redirect("/");
  });
});

//listen up
app.listen(3000, function(){
  console.log("Server running on localhost:3000");
})
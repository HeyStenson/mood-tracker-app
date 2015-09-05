var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
//views path
var views = path.join(process.cwd(), 'views/');
var db = require('./models');

// var session = require('express-session');

// CONFIG //
// serve js & css files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// body parser config to accept all datatypes
app.use(bodyParser.urlencoded({extended: true}));

// var cookieParser = require("cookie-parser");
// app.use(cookieParser()); // parse cookie data

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

//listen up
app.listen(3000, function(){
  console.log("Server running on localhost:3000");
})
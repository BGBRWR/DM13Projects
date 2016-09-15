var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var config = require("./config.json");

var app = express();

app.use(bodyParser.json());

app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true
}));

app.get("/hello", function (req, res, next) {
  res.status(200).json('hello');
});
app.get("/hatelist", function (req, res, next) {
  if (!req.session.hatelist) {
    req.session.hatelist = [];
  }
  res.status(200).json(req.session.hatelist);
});
app.post("/hatelist", function(req,res,next){
  if (!req.session.hatelist) {
    req.session.hatelist = [];
  }
  req.session.hatelist.push(req.body);
  res.status(200).json(req.session.hatelist);
})


app.listen(config.port, function() {
  console.log("Yo, it's me, your port " + config.port);
});

var express = require("express");
var bodyParser = require("body-parser");

var app = express();


var movies = [
  "movies about two brothers",
  "a film",
  "batman",
]
app.use(bodyParser.json());

app.get('/movies', function(req,res,next){
  res.status(200).json(movies);
});

app.post("/movies", function(req,res,next){
  movies.push(req.body.name);
  res.status(200).json(movies);
})




app.listen(3000, function() {
  console.log("Hey, it runnin'");
});

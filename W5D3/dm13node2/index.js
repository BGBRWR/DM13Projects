var express = require("express");
var bodyParser = require("body-parser");
var moviesController = require("./controllers/moviesController");
var config = require("./config.json");
var app = express();


app.use(bodyParser.json());

app.get("./movies", moviesController.index);
app.get("./movies/:id", moviesController.show);
app.get("./movies", moviesController.create);
app.get("./movies/:id", moviesController.update);
app.get("./movies/:id", moviesController.destory);



app.listen(config.port, function(){
  console.log("This be port " + config.port);
});

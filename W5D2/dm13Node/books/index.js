var express = require('express');
var bodyParser = require('body-parser');
var booksController = require("./controllers/booksController");



var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(function(req,res,next){
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  next();
});

app.get('/books', booksController.index);
app.get('/books/:id', booksController.show);
app.post('/books', booksController.create);
app.put('/books/:id', booksController.update);

app.listen(8080, function () {
  console.log('listening on port 8080');
});

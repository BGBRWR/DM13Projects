var express = require('express');
var bodyParser = require('body-parser');

var books = [{
  title: "Mistborn",
  author: "Brennan",
  rating: 3,
}, {
  title: "Rainbow 6",
  author: "Tom Clancey",
  rating: 6,
}];

var app = express();



app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/books', function(request, response, next){
  response.status(200).json(books);
});

app.post('/books', function(req, res, next){
  console.log(req.body);
  books.push(req.body);
  res.status(200).json(books);
});

app.listen(8080, function () {
  console.log('listening on port 8080');
});

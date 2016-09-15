var books = require("../models/books");

module.exports = {
  index: function(req, res, next) {
    result = [];
    books.map(function(book) {
      if (book.rating === parseInt(req.query.rating)) {
        result.push(book);
      }
    });
    res.status(200).json(result);
  },
  show: function(req, res, next){
    id = parseInt(req.params.id);
    res.status(200).json(books[id]);
  },

  create: function(req, res, next){
    console.log(req.body);
    books.push(req.body);
    res.status(200).json(books);
  },

  update: function(req, res, next){
    id = parseInt(req.params.id);
    books[id] = req.body;
    res.status(200).json(books[id]);
  },


};

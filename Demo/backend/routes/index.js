var express = require('express');
const bookController = require('../controllers/BookController')
var mainRouter = express.Router();

/* GET home page. */
mainRouter.post('/search', bookController.search);
mainRouter.get('/authors', bookController.getListAuthor);
mainRouter.get('/publishers', bookController.getListPublisher);

module.exports = mainRouter;

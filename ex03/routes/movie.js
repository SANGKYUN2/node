var express = require('express');
var router = express.Router();

/* 도서검색 */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '영화검색', pageName : 'movie/search.ejs'});
});

module.exports = router;


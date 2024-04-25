var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '블로그검색', pageName : 'blog/search.ejs' });
});

module.exports = router;

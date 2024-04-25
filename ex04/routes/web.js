var express = require('express');
var router = express.Router();

/* 웹문서 검색 */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '웹문서 검색', pageName : 'web/search.ejs'});
});

module.exports = router;

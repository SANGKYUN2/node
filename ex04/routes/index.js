var express = require('express');
var router = express.Router();
var db = require('../db'); //db를 찾기위해

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '회사소개', pageName : 'home.ejs' });
});

module.exports = router;

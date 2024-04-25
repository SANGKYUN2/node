var express = require('express');
var router = express.Router();
var db = require('../db'); //db를 찾기위해 씀

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Express', });
});

//로그인
router.get('/login', function(req, res, next) {
  res.render('index.ejs', {title : '로그인', pageName : 'uses/login.ejs' });
});

//로그인체크
router.post('login', function(req, res){
  
});

module.exports = router;

var express = require('express');
var router = express.Router();
var db = require('../db'); //db를 찾기위해

/* 게시판 목록 페이지 이동 */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: '게시판', pageName : 'posts/list.ejs' });
});

/* 게시판 목록 데이터 불러오기 */
router.get('/list.json', function(req, res){
  const sql = 'select *, date_format(pdate, "%Y-%m-%d-%T") fdate from posts order by pid desc;'; //최신 입력 데이터 가져옴
  db.get().query(sql, function(err, rows){
    if(err){
      console.log('게시판 목록 : ', err);
    }
    else {
      res.send(rows);
    }
  });
});

//글쓰기 페이지로 이동
router.get('/insert', function(req, res){
  res.render('index.ejs', {title : '글쓰기', pageName : 'posts/insert.ejs'})
});

//글쓰기 DB에 저장
router.post('/insert', function(req, res){
  const title = req.body.title;
  const contents = req.body.contents;
  const uid = req.body.uid;
  console.log(title, contents, uid);
  const sql = "insert into posts(title,contents,writer) values(?,?,?)";
  db.get().query(sql, [title, contents, uid], function(err, rows){
    res.redirect('/posts');
  });
});

//게시글 read 페이지 이동
router.get('/read', function(req, res){
  const pid = req.query.pid;
  console.log(pid);
  const sql = 'select *, date_format(pdate, "%Y-%m-%d-%T") fdate from posts where pid=? order by pid desc;'; //최신 입력 데이터 가져옴
  db.get().query(sql, [pid], function(err, rows){
    console.log(rows[0]);
    res.render('index.ejs', 
      {
        title : '게시글 정보', 
        pageName : 'posts/read.ejs',
        posts:rows[0]

      });
  });
  
});
module.exports = router;
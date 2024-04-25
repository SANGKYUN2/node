var express = require('express');
var router = express.Router();
var db = require('../db'); //db를 찾기위해

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//로그인페이지이동
router.get('/login', function(req, res, next) { //GET은 주로 데이터를 검색하고 캐싱이 가능하며, 데이터가 URL에 노출됩니다.
  res.render('index.ejs', { title: '로그인', pageName : 'users/login.ejs' });
});

//로그인체크
router.post('/login', function(req, res){ // POST는 주로 데이터를 생성하거나 업데이트하며, 보안적으로 더 우수하며 캐싱되지 않습니다.
  const uid = req.body.uid;
  const upass = req.body.upass;
  console.log(uid, upass);
  const sql = "select * from users where uid=?";
  db.get().query(sql, [uid], function(err, rows){
    if(err){
      console.log('에러:', err);
      return;
    }
      console.log(rows[0]);
      let result = 0;
      if(rows[0]) { //아이디값이 존재할때
        if(rows[0].upass==upass) {//비밀번호가 일치할때
          result=1;
        }
        else{
          result=2;
        }
      }
      console.log({result : result});
      res.send({result : result});
    });
  });

module.exports = router;

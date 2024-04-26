var express = require('express');
var router = express.Router();
var db = require('../db'); //db를 찾기위해

/* 게시판 목록 페이지 이동 */
router.get('/', function (req, res, next) {
    res.render('index.ejs', { title: '게시판', pageName: 'posts/list.ejs' });
});

/* 게시판 목록 데이터 불러오기 */
router.get('/list.json', function (req, res) {
    const query = "%" + req.query.query + "%";
    const page = req.query.page;
    const size = parseInt(req.query.size);
    const start = (page-1) * size;
    let sql = 'SELECT pid, title, contents, writer, date_format(pdate, "%Y-%m-%d-%T") fdate '
    sql += ' from posts ';
    sql += ' where title like ? or contents like ? or writer like ? ';
    sql += ' order by pid desc limit ?, ? ';
    // let sql = "SELECT pid, title, contents, writer, date_format(pdate, '%Y-%m-%d-%T') fdate from posts where title like CONCAT('%', ?, '%') order by pid desc limit ?, ?"; //최신 입력 데이터 가져옴
    db.get().query(sql, [query, query, query, start, size], function (err, rows) {
        const documents = rows;
        if (err) {
            console.log('게시판 목록 : ', err);
        }
        else {
            sql="select count(*) total from posts where title like ? or contents like ? or writer like ? ";
            db.get().query(sql, [query, query, query], function(err, rows){
                const total = rows[0].total;
                res.send({documents, total});
            });
        }
        
    });
});

//글쓰기 페이지로 이동
router.get('/insert', function (req, res) {
    res.render('index.ejs', { title: '글쓰기', pageName: 'posts/insert.ejs' })
});

//글쓰기 DB에 저장
router.post('/insert', function (req, res) {
    const title = req.body.title;
    const contents = req.body.contents;
    const uid = req.body.uid;
    console.log(title, contents, uid);
    const sql = "insert into posts(title,contents,writer) values(?,?,?)";
    db.get().query(sql, [title, contents, uid], function (err, rows) {
        res.redirect('/posts');
    });
});

//게시글 read 페이지 이동
router.get('/read', function (req, res) {
    const pid = req.query.pid;
    console.log(pid);
    const sql = 'select *, date_format(pdate, "%Y-%m-%d-%T") fdate from posts where pid=? order by pid desc;'; //최신 입력 데이터 가져옴
    db.get().query(sql, [pid], function (err, rows) {
        console.log(rows[0]);
        res.render('index.ejs',
            {
                title: '게시글 정보',
                pageName: 'posts/read.ejs',
                post: rows[0]

            });
    });

});

//게시글 삭제 페이지
router.get('/delete', function (req, res) {
    const pid = req.query.pid;
    console.log('.............', pid);
    const sql = "delete from posts where pid=?";
    db.get().query(sql, [pid], function (err, rows) {
        if (err) {
            console.log('삭제오류 : ', err);
        }
        res.redirect('/posts');
    })

});

//경로(URL), 라우터 + 상태를 보내고 싶으면 -> redirect
// 템플릿 전달 + 템플릿에 전달할 객체 + 콜백함수를 통한 오류, html확인을 원한다면 -> render

//게시글 수정 페이지 이동
router.get('/update', function (req, res) {
    const pid = req.query.pid;
    const sql = "select * from posts where pid=?";
    db.get().query(sql, [pid], function (err, rows) {
        if (err) {
            console.log('수정페이지 : ', err);
        }
        const post = rows[0]; //객체로 찍힘
        res.render('index.ejs',
            {
                title: '게시글 수정',
                pageName: 'posts/update.ejs',
                post: post
            });
    });
});

//데이터 수정
router.post('/update', function (req, res) {
    const pid = req.body.pid;
    const title = req.body.title;
    const contents = req.body.contents;
    console.log(pid, title, contents);
    const sql = "update posts set title=?,contents=?,pdate=now() where pid=?";
    db.get().query(sql, [title, contents, pid], function (err, rows) {
        if(err) {
            console.log('수정오류 : ', err);
        }
        res.redirect('/posts');
    });

});

//게시글 수정 페이지
// router.get('/update', function(req, res){
//   const pid = req.query.pid;
//   console.log('.............', pid);
//   const sql = "update from posts where pid=?";
//   db.get().query(sql, [pid], function(err, rows){
//     if(err) {
//       console.log('수정오류 : ', err);
//     }
//     res.redirect('/posts');
//   })

// });

module.exports = router;
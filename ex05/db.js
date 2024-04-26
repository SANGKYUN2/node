var mysql = require('mysql'); //require : 요구하다
var config={
    connectionLimit : 100, //최대 몇개까지 만들것인지
    host : '127.0.0.1',
    user : 'node',
    password : 'pass',
    database : 'nodedb',
    port : '3306'
}

var pool=mysql.createPool(config);
var connection;

exports.connect = function(){ //export : 수출하다
    pool.getConnection(function(err, con) {
        if(err){
            console.log('db접속 오류 : ', err);
        }
        else {
            connection = con;
            console.log('접속성공');
        }
    });
}

exports.get = function(){
    return connection;
}
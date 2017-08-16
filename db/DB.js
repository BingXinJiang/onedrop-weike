var mysql = require('mysql');

var congig = {
	host: '119.23.24.122',
	user: 'root',   
	password: 'JSong1213556',
	database:'test3',
    // database:'test',
	port: 3306  
}

var pool = mysql.createPool(congig);

var query = function(sql, callback){
	pool.getConnection(function(err, conn){
		if(err){
			callback(err,null,null);
		}else{
			conn.query(sql, function(qerr,vals,fields){
				conn.release();
				callback(qerr,vals,fields);
			})
		}
	})
}

module.exports = query;


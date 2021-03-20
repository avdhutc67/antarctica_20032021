var mysql = require('mysql');
const db_connect = appRequire('db_connect');

exports.getUsers = function(user_id,user_email,user_password,iDisplayStart,iDisplayLength,iSortCol_0,sSortDir_0,user_fname,user_lname,emp_id) {
	return new Promise((resolve,reject)=>{
		var sort_col
		if(iSortCol_0 == 0) { sort_col = "te.emp_id"}
		else if(iSortCol_0 == 1) { sort_col = "tu.user_fname"}
		else if(iSortCol_0 == 2) { sort_col = "tu.user_lname"}
		else if(iSortCol_0 == 3) { sort_col = "tu.user_email"}
		else if(iSortCol_0 == 4) { sort_col = "tu.user_password"}
		else if(iSortCol_0 == 5) { sort_col = "tu.organization"}


		var query = "SELECT * FROM tbl_users as tu ";
	    query += " INNER JOIN tbl_employees as te ON te.user_id = tu.user_id";
	    query += " WHERE tu.in_status = 1";

	    if(typeof user_id !== 'undefined' && user_id != "")
	    	query += " AND tu.user_id = '"+user_id+"'";

	    if(typeof user_email !== 'undefined' && user_email != "")
	    	query += " AND tu.user_email = '"+user_email+"'";

	    if(typeof user_password !== 'undefined' && user_password != "")
	    	query += " AND tu.user_password = '"+user_password+"'";

	    if(typeof user_fname !== 'undefined' && user_fname != "")
	    	query += " AND tu.user_fname LIKE '%"+user_fname+"%'";

	    if(typeof user_lname !== 'undefined' && user_lname != "")
	    	query += " AND tu.user_lname LIKE '%"+user_lname+"%'";

	    if(typeof emp_id !== 'undefined' && emp_id != "")
	    	query += " AND te.emp_id LIKE '%"+emp_id+"%'";

	    if(typeof iSortCol_0 !== 'undefined' && iSortCol_0 != "")
	    	query += " ORDER BY "+sort_col+" "+sSortDir_0;

	    if(typeof iDisplayStart !== 'undefined' && iDisplayStart != "" && typeof iDisplayLength !== 'undefined' && iDisplayLength != "")
	    	query += " LIMIT "+iDisplayStart+","+iDisplayLength;

	     db_connect.query(query, function (err, result, fields) {
	        
	        return resolve(result);
	      });
    })
}

exports.createUser = function(insertInfo) {
	return new Promise((resolve,reject)=>{
		
		let columns = Object.keys(insertInfo);
		columns = '`'+columns.join('`, `')+'`';
		

		let data = Object.values(insertInfo);
		data = "'"+data.join("','")+"'";
		

		var query = "INSERT INTO tbl_users ("+columns+") VALUES(";
	    query += data;
	    query += ")";

	    
	     db_connect.query(query, function (err, result, fields) {
	     	var query1 = "INSERT INTO tbl_employees (`user_id`) VALUES('";
		    query1 += result.insertId;
		    query1 += "')";
		    db_connect.query(query1, function (err, result, fields) {
	        	return resolve("User Inserted Successfully.");
	     	});
	     });
    })
}
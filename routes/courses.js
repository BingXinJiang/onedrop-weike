var express = require('express');
var router = express.Router();
var query = require('../db/DB');
var Course = require('../model/course');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getCourse', function(req, res, next){

	var query_sql = "select * from course5";

	query(query_sql, function(qerr, valls, fields){
		var courses = [];
		valls.map(function(val){
			var course = new Course();
			course.course_id = val.id_course;
			course.title = val.title;
			course.content = val.content;
			course.author = val.author;
			courses.push(course);
		});
		var respose  = {
			status:1,
			data:{
				title:'领导力细节',
				courses:courses
			}
		}
		res.json(respose);
	})
	
});

module.exports = router;
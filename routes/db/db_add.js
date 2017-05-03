var express = require('express');
var router = express.Router();
var query = require('../../db/DB');
var OneDrop = require('../../db/onedrop');

/* GET home page. */

router.post('/', function(req, res, next) {
  	var title = req.body.title;
  	var content = req.body.content;
  	var author = req.body.author;

  	var in_sql = "insert into course(title,content,author)values('"+title+ "','"+content+"','"+author+"');";

  	query(in_sql, function(qerr, valls, fields){
  		res.send({status:200, data:'数据插入成功'});
  	})
});
/**
 * 添加课程
 * 参数: title
 * 		price
 * 		introduction
 * 		author	
 * */
router.post('/add_course', function (req, res, next) {

	var course_id = 0;

	var title = req.body.title;

	var background_image = '';

	var price = req.body.price;
	var introduction = req.body.introduction;
	var author = req.body.author;

	var max_sql = "select * from course order by course_id desc limit 1";

	query(max_sql, function (qerr, valls, fields) {
		if(qerr){
			var response = {
				status:0,
				data:{
					msg:'查询失败'
				}
			}
			res.json(response);
		}else{
			if(valls.length>0){
				var course = valls[0];
				course_id = course.course_id + 1;
			}else{
				course_id = 1;
			}
			background_image = OneDrop.base_ip + 'weixin/images/courses/course_'+course_id+'.jpg';
			var insert_sql = "insert into course values("+course_id+",'"+title+"','"+background_image+"',"+price+",'"+introduction+"','"+author+"')";
			console.log(insert_sql);
			query(insert_sql, function (qerr, valls, fields) {
				if(qerr){
					var response = {
						status:0,
						data:{
							msg:'插入失败'
						}
					}
					res.json(response);
				}else {
					var response = {
						status:1,
						data:{
							course_id:course_id,
							title : title,
							background_image : background_image,
							price : price,
							introduction : introduction,
							author : author
						}
					}
					res.json(response);
				}
			})
		}
	})

})
/**
 * 添加课程小节内容(每个参数均为必填参数)
 * 参数:  course_id
 * 		 course_title
 * 		 chapter_num
 * 		 chapter_name
 * 		 section_name
 * 		 section_num
 * 		 section_des
 * */
router.post('/add_section', function (req, res, next) {

	var course_id = req.body.course_id;
	var course_title = req.body.course_title;
	var chapter_num = req.body.chapter_num;
	var chapter_name = req.body.chapter_name;
	var section_id = 0;
	
	var section_name = req.body.section_name;
	var section_voice = '';
	var section_num = req.body.section_num;
	var section_des = req.body.section_des;
	var max_sql = "select * from course_section order by section_id desc limit 1";

	//增加判断逻辑,如果输入数据,在数据库中存在同样的 course_id chapter_num section_num 则update
	var is_exit_sql = "select * from course_section where course_id = "+course_id+" and chapter_num = "+chapter_num+" and section_num = "+section_num;
	var update_sql = "update course_section set course_title = '"+course_title+"',chapter_name = '"+chapter_name+"',section_name = '"+section_name+"',section_des = '"+section_des+"' where course_id = "+course_id+" and chapter_num = "+chapter_num+" and section_num = "+section_num;

	query(is_exit_sql, function (qerr, valls, fields) {
		if(qerr){
			var response = {
				status:0,
				data:{
					msg:'数据库执行错误'
				}
			}
			res.json(response);
		}else{
			if(valls.length>0){//已存在该条记录,则查询
				var section = valls[0];
				query(update_sql, function (qerr, valls, fields) {
					if(qerr){
						var response = {
							status:0,
							data:{
								msg:'数据更新失败'
							}
						}
						res.json(response);
					}else{
						var response = {
							status:1,
							data:{
								course_id : course_id,
								course_title : course_title,
								chapter_num : section.chapter_num,
								chapter_name : chapter_name,
								section_id : section.section_id,
								section_name : section_name,
								section_voice : section.section_voice,
								section_num : section.section_num,
								section_des : section_des
							}
						}
						res.json(response);
					}
				})
			}else{//没有记录,则插入记录
				query(max_sql, function (qerr, valls, fields) {
					if(qerr){
						var response = {
							status:0,
							data:{
								msg:'查询失败'
							}
						}
						res.json(response);
					}else{
						if(valls.length>0){
							var section = valls[0];
							section_id = section.section_id + 1;
						}else {
							section_id = 1;
						}
						section_voice = OneDrop.base_ip + 'weixin/voices/sections/section_'+course_id+'_'+chapter_num+'_'+section_num+'.mp3';
						var insert_sql = "insert into course_section values("+course_id+",'"+course_title+"',"+chapter_num+",'"+chapter_name+"',"+section_id+",'"+section_name+"','"+section_voice+"',"+section_num+",'"+section_des+"')";
						query(insert_sql, function (qerr, valls, fields) {
							if(qerr){
								var response = {
									status:0,
									data:{
										msg:'插入失败'
									}
								}
								res.json(response);
							}else{
								var response = {
									status:1,
									data:{
										course_id : course_id,
										course_title : course_title,
										chapter_num : chapter_num,
										chapter_name : chapter_name,
										section_id : section_id,
										section_name : section_name,
										section_voice : section_voice,
										section_num : section_num,
										section_des : section_des
									}
								}
								res.json(response);
							}
						})
					}
				});
			}
		}
	})

})

module.exports = router;
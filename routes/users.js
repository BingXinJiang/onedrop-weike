var express = require('express');
var router = express.Router();
var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUserInfo', function(req, res, next){
	var user = new User();
	user.name = 'ligh';
	user.age = '12';
	user.city = '上海';
	var response = {status:1, data:user}
	res.send(JSON.stringify(response));
})

module.exports = router;

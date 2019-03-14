var express = require('express')
var router = express.Router()
var model = require('../db/db')

// 获取用户数据
router.get('/', function(req, res) {
	model.User.find({}, (err, doc) => {
		if (err) {
			res.json({
				status: 4000,
				success: false,
				message: err.message
			})
		} else {
			res.json({
				status: 2000,
				success: true,
				data: doc
			})
		}
	})
})

// 删除用户
router.post('/delete', function(req, res) {
	model.User.deleteOne({ email: req.body.email }, (err, doc) => {
		if (err) {
			res.json({
				status: 4000,
				success: false,
				message: err.message
			})
		} else {
			res.json({
				status: 2000,
				success: true,
				data: doc
			})
		}
	})
})

module.exports = router

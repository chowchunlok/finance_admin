var express = require('express')
var router = express.Router()
var model = require('../db/db')
var sha1 = require('sha1')
var moment = require('moment')
var objectIdToTimestamp = require('objectid-to-timestamp')
var createToken = require('../middleware/createToken')
var checkToken = require('../middleware/checkToken')

// 注册管理员
router.post('/register', function(req, res) {
	console.log(req.body)
	let adminRegister = new model.Admin({
		name: req.body.name,
		password: sha1(req.body.password),
		roles: req.body.roles,
		avatar: '/static/images/' + req.body.avatar
	})
	adminRegister.create_time = moment(
		objectIdToTimestamp(adminRegister._id)
	).format('YYYY-MM-DD HH:mm:ss')
	model.Admin.findOne(
		{
			name: adminRegister.name.toLowerCase()
		},
		(err, doc) => {
			if (err) {
				res.json({
					code: 3040,
					message: 'Unknown Wrong'
				})
				console.log('register-3040:', err) //TODO: debug
			}
			if (doc) {
				res.json({
					code: 3001,
					message: 'User Already Exists!'
				})
			} else {
				adminRegister.save(err => {
					if (err) {
						res.json({
							code: 3002,
							message: 'Server Error!'
						})
					} else {
						res.json({
							code: 2000,
							message: 'Register Success'
						})
					}
				})
			}
		}
	)
})

// 管理员登录
router.post('/login', function(req, res) {
	password = sha1(req.body.password)

	model.Admin.findOne({ name: req.body.username }, (err, doc) => {
		if (err) {
			console.log(err) //TODO: for debug
			res.json({
				code: 4040,
				message: 'Unkown Error'
			})
		}
		if (!doc) {
			res.json({
				code: 4002,
				message: 'Unregistered Admin'
			})
		} else if (password === doc.password) {
			res.json({
				code: 2000,
				message: 'Login Success',
				token: createToken(req.body.username),
				data: doc
			})
		} else {
			res.json({
				code: 4001,
				message: 'Incorrect Password'
			})
		}
	})
})

// 获取管理员信息
router.get('/info', checkToken, function(req, res) {
	let name = req.adminName // from checkToken decoded.name
	model.Admin.findOne({ name: name }, (err, doc) => {
		if (err) {
			console.log(err) // TODO: debug
			res.json({
				code: 6040,
				message: 'Server Error'
			})
		}
		if (!doc) {
			res.json({
				code: 6001,
				message: "Admin Don't Exit"
			})
		} else {
			res.json({
				code: 2000,
				data: doc
			})
		}
	})
})

// 管理员登出
router.post('/logout', function(req, res) {
	res.json({
		code: 2000,
		message: 'Logout Success'
	})
})

module.exports = router

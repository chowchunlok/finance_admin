var express = require('express')
var router = express.Router()
var model = require('../db/db')
var sha1 = require('sha1')
var moment = require('moment')
var objectIdToTimestamp = require('objectid-to-timestamp')
var createToken = require('../middleware/createToken')
var checkToken = require('../middleware/checkToken')

// 注册管理员
router.get('/register', function(req, res) {
	let adminRegister = new model.Admin({
		name: req.body.name,
		password: sha1(req.body.password),
		roles: []
	})
	adminRegister.roles.push(req.body.role)
	adminRegister.create_time = moment(
		objectIdToTimestamp(adminRegister._id)
	).format('YYYY-MM-DD HH:mm:ss')

	model.Admin.findOne(
		{
			name: adminRegister.name.toLowerCase()
		},
		(err, doc) => {
			if (err) console.log(err) //TODO:
			if (doc) {
				res.json({
					code: 4008,
					message: 'User already exists! Cannot register repeatedly'
				})
			} else {
				adminRegister.save(err => {
					if (err) {
						res.json({
							success: false,
							code: 4010,
							message: 'register failed'
						})
					}
					res.json({
						success: true,
						code: 2000,
						message: 'register success'
					})
				})
			}
		}
	)
})

// 管理员登录
router.post('/login', function(req, res) {
	// let adminLogin = new model.Admin({
	// name = req.body.username
	password = sha1(req.body.password)
	// })
	model.Admin.findOne({ name: req.body.username }, (err, doc) => {
		if (err) {
			return console.log(err) // for debug
		}
		if (!doc) {
			res.json({
				code: 4004,
				message: 'admin no exit'
			})
		} else if (password === doc.password) {
			res.json({
				code: 2000,
				message: 'login success',
				token: createToken(req.body.username),
				data: doc
			})
		} else {
			res.json({
				code: 4010,
				message: 'secret wrong!'
			})
		}
	})
})

// 获取管理员信息
router.get('/info', checkToken, function(req, res) {
	// console.log(req.adminName)
	// console.log(name)
	let name = req.adminName
	model.Admin.findOne({ name: name }, (err, doc) => {
		if (err) {
			return console.log(err)
		}
		if (!doc) {
			res.json({
				code: 4004,
				message: 'admin no exit'
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
		message: 'logout success'
	})
})

module.exports = router

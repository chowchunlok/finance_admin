var express = require('express')
var router = express.Router()
var model = require('../db/db')

// 添加新闻
router.get('/add', function(req, res) {
	console.log(8888) // for debug
	model.News.find({}, (err, doc) => {
		res.json({
			data: doc
		})
		if (err) {
			res.json({
				code: 4000,
				message: '查询数据库失败'
			})
		} else {
			console.log(doc)
			doc[0].newsList.push(req.body.data)
			doc[0].save((err, pro) => {
				if (err) {
					console.log(err)
					res.json({
						code: 4004,
						message: '数据库保存失败'
					})
				} else {
					res.json({
						code: 2000,
						message: '新闻数据更新成功'
					})
				}
			})
		}
	})
})

module.exports = router

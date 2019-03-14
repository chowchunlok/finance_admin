var express = require('express')
var router = express.Router()
var model = require('../db/db')

// 增加新闻
router.post('/add', function(req, res) {
	model.News.find({}, (err, doc) => {
		if (err) {
			res.json({
				code: 4000,
				message: '查询数据库失败'
			})
		} else {
			// editor url
			var len = doc[0].newsList.length + 1
			req.body.data.url += len
			req.body.data.date = req.body.data.date.slice(0, 10)

			doc[0].newsList.push(req.body.data)
			doc[0].save((err, pro) => {
				if (err) {
					console.log(err) //TODO: for debug
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

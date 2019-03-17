var express = require('express')
var router = express.Router()
var model = require('../db/db')

// 发布新闻
router.post('/release', function(req, res) {
  model.News.find({}, (err, doc) => {
    if (err) {
      console.log('release_err 8040:', err) //DEBUG:release_err 8040
      res.json({
        code: 8040,
        message: 'Database Error'
      })
    } else {
      let target = req.body.data
      let newsList = doc[0].newsList

      var len = newsList.length + 1
      target.url += len
      target.date = target.date.slice(0, 10)

      newsList.push(target)
      doc[0].save((err, pro) => {
        if (err) {
          console.log('release_save 8001', err) //DEBUG:release_SAVE 8001
          res.json({
            code: 8001,
            message: 'Data Save Failed'
          })
        } else {
          res.json({
            code: 2000,
            message: 'Release Success'
          })
        }
      })
    }
  })
})

module.exports = router

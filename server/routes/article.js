var express = require('express')
var router = express.Router()
var model = require('../db/db')

//获取文章列表 NOTE: routes > fetch article list
router.get('/list', function(req, res) {
  model.Article.find({}, (err, doc) => {
    console.log(doc) //DEBUG:
    if (err) {
      console.log('list_err 8040:', err) //DEBUG:list_err 8040
      res.json({
        code: 8040,
        message: 'Database Error'
      })
    } else if (!doc) {
      res.json({
        code: 8041,
        message: 'No Data'
      })
    } else {
      res.json({
        code: 2000,
        data: {
          total: 2,
          items: doc
        }
      })
    }
  })
})

module.exports = router

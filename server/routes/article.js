var express = require('express')
var router = express.Router()
var model = require('../db/db')

//获取文章列表 NOTE: routes > fetch article list
router.get('/list', function(req, res) {
  model.Article.find({}, (err, doc) => {
    // console.log(doc) //DEBUG:
    if (err) {
      console.log('list_err 8040:', err) //DEBUG:list_err 8040
      res.json({
        code: 8040,
        message: 'Database Error'
      })
    } else if (!doc) {
      res.json({
        code: 8041,
        message: 'Not Found Data'
      })
    } else {
      res.json({
        code: 2000,
        data: {
          total: doc.length,
          items: doc
        }
      })
    }
  })
})

// id获取文章详细
router.get('/details', function(req, res) {
  let id = req.query.id
  model.Article.findOne({ id }, (err, doc) => {
    // console.log(doc) //DEBUG:
    if (err) {
      console.log('list_err 8042:', err) //DEBUG:list_err 8040
      res.json({
        code: 8042,
        message: 'Database Error'
      })
    } else if (!doc) {
      res.json({
        code: 8043,
        message: 'Not Found Data'
      })
    } else {
      res.json({
        code: 2000,
        data: {
          message: 'Fetch Success',
          items: doc
        }
      })
    }
  })
})

//更新文章
router.post('/update', function(req, res) {
  let id = req.body.id
  model.Article.findOne({ id }, (err, doc) => {
    if (err) {
      console.log('update_err 8042:', err) //DEBUG:update_err 8040
      res.json({
        code: 8042,
        message: 'Database Error'
      })
    }
    if (!doc) {
      res.json({
        code: 8043,
        message: 'Not Found Data'
      })
    } else {
      // TODO: routes > update article status
      res.json({
        code: 2000,
        message: 'Update Success',
        data: doc
      })
    }
  })
})

//获取作者列表
router.get('/author/list', function(req, res) {
  //TODO: mongodb find with key????
  res.json({
    code: 2000
  })
})

module.exports = router

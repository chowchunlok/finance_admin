var express = require('express')
var router = express.Router()
var model = require('../db/db')

// 获取用户数据
router.get('/getData', function(req, res) {
  model.User.find({}, (err, doc) => {
    if (err) {
      console.log('getData 7040:', err) //DEBUG:getData 7040
      res.json({
        code: 7040,
        message: 'Unknown Error'
      })
    }
    if (!doc) {
      res.json({
        code: 7001,
        message: 'Not have any user'
      })
    } else {
      res.json({
        code: 2000,
        message: 'Get user data successfully',
        data: doc
      })
    }
  })
})

// 删除用户
router.post('/delete', function(req, res) {
  model.User.deleteOne({ email: req.body.email }, (err, doc) => {
    console.log(err, doc)
    if (err || doc.ok === 0) {
      console.log('delete 7041', err, doc) //DEBUG:getData 7040
      res.json({
        code: 7041,
        message: 'Unknown Error'
      })
    }
    if (doc.ok === 1) {
      if (doc.deletedCount === 1) {
        res.json({
          code: 2000,
          message: 'Delete Success'
        })
      } else {
        res.json({
          code: 7002,
          message: 'No matched user to delete'
        })
      }
    }
  })
})

module.exports = router

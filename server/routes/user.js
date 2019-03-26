var express = require('express')
var router = express.Router()
var model = require('../db/db')

// 获取用户数据
router.get('/fetchUsers', function(req, res) {
  model.User.find({}, (err, doc) => {
    if (err) {
      console.log('data 7040:', err) //DEBUG:data 7040
      res.json({
        code: 7040,
        message: 'Unknown Error'
      })
    }
    if (!doc) {
      res.json({
        code: 7001,
        message: 'No Users Data'
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
    if (err || doc.ok === 0) {
      console.log('delete 7041', err, doc) //DEBUG:delete 7041
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

// 用户详细信息 TODO: routes > user's details
router.get('/details', function(req, res) {
  let email = req.query.email
  model.User.findOne({ email: email }, (err, doc) => {
    if (err) {
      console.log('details 7042', err, doc) //DEBUG:details 7042
      res.json({
        code: 7042,
        message: 'Unknown Error'
      })
    }
    if (!doc) {
      res.json({
        code: 7003,
        message: "Email Haven't Registered"
      })
    } else {
      res.json({
        code: 2000,
        message: 'Get User Details Successfully',
        data: doc
      })
    }
  })
})

module.exports = router

var express = require('express')
var router = express.Router()
var model = require('../db/db')
var sha1 = require('sha1')
var createToken = require('../middleware/createToken')
var checkToken = require('../middleware/checkToken')

// 管理员登录
router.post('/', function(req, res) {
  password = sha1(req.body.password)

  model.Admin.findOne({ name: req.body.username }, (err, doc) => {
    if (err) {
      console.log('routes login 4040', err) //DEBUG: routes login 4040
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

// 管理员登出
router.post('/logout', function(req, res) {
  res.json({
    code: 2000,
    message: 'Logout Success'
  })
})

// 获取管理员信息
router.get('/loginInfo', checkToken, function(req, res) {
  let name = req.adminName // from checkToken decoded.name
  model.Admin.findOne({ name: name }, (err, doc) => {
    if (err) {
      console.log('GETINFO 4040', err) // DEBUG: GETINFO 4040
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

module.exports = router

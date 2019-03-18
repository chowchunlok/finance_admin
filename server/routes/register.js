var express = require('express')
var router = express.Router()
var model = require('../db/db')
var sha1 = require('sha1')
var moment = require('moment')
var objectIdToTimestamp = require('objectid-to-timestamp')
var multer = require('multer')

// 管理员提交注册信息
router.post('/registerInfo', function(req, res) {
  console.log(req.body)
  let adminRegister = new model.Admin({
    name: req.body.name,
    password: sha1(req.body.password),
    roles: req.body.roles,
    avatar: req.body.avatar
  })
  adminRegister.create_time = moment(objectIdToTimestamp(adminRegister._id)).format(
    'YYYY-MM-DD HH:mm:ss'
  )
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
        console.log('register-3040:', err) //DEBUG: debug
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

// 管理员上传头像
var timepath = moment().format('YYYY-MM-DD')
var destination = '/public/upload/' + timepath
var filename = ''

var storage = multer.diskStorage({
  destination: '.' + destination,
  filename: (req, file, cb) => {
    timestamp = new Date().getTime()
    filename = 'avatar-' + timestamp + '.' + file.originalname.split('.')[1]
    cb(null, filename)
  }
})
var upload = multer({ storage: storage })
var cpUpload = upload.single('avatar')

router.post('/upload', cpUpload, function(req, res) {
  console.log(req.file)
  res.json({
    code: 2000,
    filename: '/static' + destination.slice(7) + '/' + filename
  })
})

module.exports = router

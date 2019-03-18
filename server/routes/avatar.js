// var express = require('express')
// var router = express.Router()
// var multer = require('multer')
// var moment = require('moment')

// var timepath = moment().format('YYYY-MM-DD')
// var destination = '/public/upload/' + timepath
// var filename = ''

// var storage = multer.diskStorage({
//   destination: '.' + destination,
//   filename: (req, file, cb) => {
//     timestamp = new Date().getTime()
//     filename = 'avatar-' + timestamp + '.' + file.originalname.split('.')[1]
//     cb(null, filename)
//   }
// })

// var upload = multer({ storage: storage })

// var cpUpload = upload.single('avatar')

// router.post('/upload', cpUpload, function(req, res) {
//   console.log(req.file)
//   res.json({
//     code: 2000,
//     filename: '/static' + destination.slice(7) + '/' + filename
//   })
// })

// module.exports = router

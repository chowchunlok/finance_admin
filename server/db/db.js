var mongoose = require('mongoose')

var Article = require('../models/News')
var User = require('../models/User')
var Admin = require('../models/Admin')
var Article = require('../models/Article')

// db config
var options = { keepAlive: 120, useNewUrlParser: true, bufferCommands: false }

// db connection
mongoose.connect('mongodb://127.0.0.1:27017/finance_web', options).then(
  res => {
    console.log('MongoDB Connected Successfully')
  },
  err => {
    console.log(err.message)
  }
)

var model = {
  Article,
  User,
  Admin,
  Article
}

module.exports = model

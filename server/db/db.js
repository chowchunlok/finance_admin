var mongoose = require('mongoose')

var Article = require('../models/News')
var User = require('../models/User')
var Admin = require('../models/Admin')
var Article = require('../models/Article')
var Author = require('../models/Author')

// db config
var options = { keepAlive: 120, useNewUrlParser: true, bufferCommands: false }

// db connection
mongoose.connect('mongodb://127.0.0.1:27017/finance_web', options).then(
  res => {
    console.log('financial_web Connected Successfully')
  },
  err => {
    console.log(err.message)
  }
)

var model = {
  Article,
  User,
  Admin,
  Article,
  Author
}

module.exports = model

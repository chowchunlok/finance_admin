var mongoose = require('mongoose')

var News = require('../models/News')
var User = require('../models/User')
var Admin = require('../models/Admin')

// db config
var options = { keepAlive: 120, useNewUrlParser: true, bufferCommands: false }

// db connection
mongoose.connect('mongodb://127.0.0.1:27017/finance_web', options).then(
	() => {
		console.log('MongoDB Connected Successfully')
	},
	err => {
		console.log(err.message)
	}
)

var model = {
	News,
	User,
	Admin
}

module.exports = model

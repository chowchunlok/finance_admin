var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
	email: String,
	password: String,
	name: String,
	birth: String,
	recheck: String,
	token: String,
	stock: String,
	create_time: Date
})

module.exports = mongoose.model('User', userSchema)

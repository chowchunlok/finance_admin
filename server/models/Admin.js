var mongoose = require('mongoose')
var Schema = mongoose.Schema

var newSchema = new Schema({
	username: String,
	password: String,
	role: Array,
	create_time: String
})

module.exports = mongoose.model('Admin', newSchema)

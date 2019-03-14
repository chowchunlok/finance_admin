var mongoose = require('mongoose')
var Schema = mongoose.Schema

var newSchema = new Schema({
	name: String,
	password: String,
	roles: Array,
	create_time: String,
	avatar: String
})

module.exports = mongoose.model('Admin', newSchema)

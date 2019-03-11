var mongoose = require('mongoose')
var Schema = mongoose.Schema

var newSchema = new Schema({
	newsTitle: String,
	newsList: Array
})

module.exports = mongoose.model('News', newSchema)

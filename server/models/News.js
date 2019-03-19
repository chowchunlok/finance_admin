var mongoose = require('mongoose')
var Schema = mongoose.Schema

var newsSchema = new Schema({
  newsTitle: String,
  newsList: Array
})

module.exports = mongoose.model('News', newsSchema)

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var authorSchema = new Schema({
  authorList: Array
})

module.exports = mongoose.model('Author', authorSchema)

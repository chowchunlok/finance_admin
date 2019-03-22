var mongoose = require('mongoose')
var Schema = mongoose.Schema

var articleSchema = new Schema({
  // 13
  id: Number,
  timestamp: Number,
  author: String,
  reviewer: String,
  title: String,
  summary: String,
  content: String,
  importance: Number,
  type: Array,
  status: String,
  display_time: String,
  comment_disabled: Boolean,
  pageviews: Number
})

module.exports = mongoose.model('Article', articleSchema)

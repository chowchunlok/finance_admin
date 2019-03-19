var mongoose = require('mongoose')
var Schema = mongoose.Schema

var articleSchema = new Schema({
  id: Number,
  timestamp: Number,
  author: String,
  reviewer: String,
  title: String,
  content_short: String,
  content: String,
  forecast: Number,
  importance: Number,
  type: Array,
  status: String,
  display_time: String,
  comment_disabled: Boolean,
  pageviews: Number,
  image_uri: String,
  platforms: Array
})

module.exports = mongoose.model('Article', articleSchema)

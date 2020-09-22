// set Category Schema
// connect mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CategorySchema = new Schema({
  name: {
    type: String,

  },
  icon: {
    type: String,

  }
})

module.exports = mongoose.model('Category', CategorySchema)
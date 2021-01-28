const mongoose = require('mongoose')
const Schema = mongoose.Schema

const skillSchema = new Schema({
  Name: {
    type: String,
    required: true
  }
})

module.exports = Skills = mongoose.model('skills', skillSchema)
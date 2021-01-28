const mongoose = require('mongoose')
const Schema = mongoose.Schema

const educationSchema = new Schema({
  school: {
    type: String,
    required: true
  },
  startyear:{
    type:Number,
    required:true
  },
  endyear:{
    type:Number,
    required:true
  },
  degree: {
    type: String,
    required: true
  },
  stream: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Education', educationSchema)
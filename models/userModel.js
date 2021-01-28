const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const experience = require('./experienceModel');
const education = require('./educationModel');

const roles = [
  'Student', 'Employee', 'Freelance'
]
const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  voice:{type:Boolean, default:false},
  shareprofile:{type:Boolean, default:false},
  avatar: { type: String },
  contact: { type: Number },
  role: { type: String, enum: roles, default:"Student"},
  country: { type: String },
  state: { type: String },
  city: { type: String },
  skills:[{
    value:String
  }],
  experience: { type: [experience.schema] },
  education: { type: [education.schema] }
});

module.exports = User = mongoose.model("User", userSchema);
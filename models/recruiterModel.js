const mongoose = require("mongoose");
const Schema = mongoose.Schema

const recruiterSchema = new Schema({
    name: { type:String },
    email: { type:String, unique: true },
    password: { type:String, minlength: 6 },
    logo:String,
    company:String,
    description:String
  });
  

module.exports = Recruiter = mongoose.model("Recruiter",recruiterSchema);
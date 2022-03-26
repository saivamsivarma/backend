const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    google_id:{type:String},
    name : {type:String},
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 6},
    role :{type:String,enum: ['user', 'employer'],default: 'user'}
});

module.exports = Auth = mongoose.model("Auth", authSchema);
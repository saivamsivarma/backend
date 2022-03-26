const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.ObjectId, ref: 'user', required:true},
    name:{type:String},
    email:{type:String},
    age:{type:Number},
    contact: { type: Number },
    occupation:{ type: String },
    clgcompName:{ type: String },
    education:{type:String},
    role:{ type: String },
    seniority:{ type: String },
    experience:{ type: String },
    shareprofile:{type:String, default:'on'},
    image: { type: String },
    geo_location:[String],
    country: { type: String },
    skills:{type:String},
    
});

userSchema.index({'$**':'text'});
module.exports = User = mongoose.model("Users", userSchema);
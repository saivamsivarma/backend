const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    _id: {type: mongoose.Schema.ObjectId,ref: 'employer',required: [true, 'A job can only be posted by employer']},
    companyname: {type:String},
    contact: { type: Number },
    name:{type:String},
    size:{type:Number},
    description: {type:String},
    logo: { type: String },
});

module.exports = Company = mongoose.model("Company", companySchema);
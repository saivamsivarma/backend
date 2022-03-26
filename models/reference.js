const mongoose = require("mongoose");

const referenceSchema = mongoose.Schema({
    user_id:{type:mongoose.Schema.ObjectId, ref: 'Users', required:true},
    job_id:{type:mongoose.Schema.ObjectId, ref: 'Jobs', required:true},
    email:{type:String, require:true},
    company:{type:String}
});

module.exports = Reference = mongoose.model("References",referenceSchema);
const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
    job_id:{type:mongoose.Schema.ObjectId, ref: 'Jobs', required:true},
    user_id:{type:mongoose.Schema.ObjectId, ref: 'Users', required:true},
    status:{type:String, default:"Pending"},
    company:{type:String}
});

module.exports = Application = mongoose.model("Applications",applicationSchema);
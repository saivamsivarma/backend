const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    company_id:{type:mongoose.Schema.ObjectId, ref: 'Company'},
    company_name:{type:String},
    company_logo:{type:String},
    postName:{type:String},
    description:{type:String},
    keyword:[String],
    location:{type:String},
    geo_location:[String],
    jobType:{type:String},
    address:{type:String, default:'on'},
    remote:{type:String, default:'off'},
    active:{type:String, default:'on'},
    openapplication:{type:String, default:'on'},
});

jobSchema.index({'$**':'text'});
module.exports = Job = mongoose.model("Jobs",jobSchema);
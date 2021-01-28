const mongoose = require("mongoose");
const Schema = mongoose.Schema

const applicationSchema = new Schema({
    jobId:{
        type:Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicantId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }
});

module.export = Application = mongoose.model("application",applicationSchema);
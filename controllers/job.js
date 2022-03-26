const JobModel = require("../models/job")

const postJob = async (req,res) =>{
    const {company_id,company_name,company_logo,postName,description,keyword,location,jobType,address,remote,geo_location} = req.body
    try{
        if(!{company_id}) return res.status(404).json({message:"Company id not founded"});

        if(!{geo_location}) return res.status(501).json({message:"Please confirm job location"})

        const result = await JobModel.create({company_id,company_name,company_logo,postName,description,keyword,location,jobType,address,remote,geo_location})
        res.status(200).json(result)
    } catch(err){
        res.status(501).json({message:"Somethong went wrong"})
        console.log(err)
    }
}

const getJob = async(req,res) => {
    try{
        const job = await JobModel.findOne({_id:req.params.id}).populate("company_id");
        res.status(201).json(job)
    } catch(err){
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

const getCompanyJobs = async(req,res) =>{
    try{
        const job = await JobModel.find({company_id:req.params.id})
        res.status(201).json(job)
    } catch(err){
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

const getAlljobs = async(req,res) =>{
    try{
        const jobs = await JobModel.find().populate("company_id")
        res.status(201).json(jobs)
    } catch(err){
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

const voiceJobs = async(req,res) =>{
    const location = req.params.location
    const type = req.params.type
    console.log(type)
    try{
        const jobs = await JobModel.find({location:location,jobType:type}).populate("company_id")
        res.status(201).json(jobs)
    } catch(err){
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

const updateJob = async (req,res) =>{
    const {id} = req.params.id;
    const {keyword,location,jobType,address,remote,active,openapplication} = req.body
    try{
        if(!id) return res.status(404).json({message:"something went wrong"});
        const updatejob = {keyword,location,jobType,address,remote,active,openapplication,_id:id}

        const result = await JobModel.findByIdAndUpdate(id,updatejob,{new:true});
        res.status(201).json(result)
    } catch(err){
        res.status(501).json({message:"Something went wrong"})
        console.log(err)
    }
}


const searchJob = async(req,res)=>{
    var query = req.params.query;
    try {
        const searchJob = await JobModel.find({
            $text: {
                $search: query
            }
        }).populate("company_id");
        res.status(200).json(searchJob);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }
}
module.exports = {postJob,getJob,getAlljobs,updateJob,getCompanyJobs,searchJob,voiceJobs}
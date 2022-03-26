const ApplicationModel = require("../models/application");

const postApplication = async(req,res) => {
    const {job,user,company} = req.body
    console.log(job,user)
    try{
        if(!user) return res.status(404).json({message:"Invalid User Id"});

        const check = await ApplicationModel.find({job_id:job,user_id:user,})
        if(check.length ===1) return res.status(500).json({message:"You have already Applied to this Job"})

        const result = await ApplicationModel.create({job_id:job,user_id:user,company})
        console.log(result)
        res.status(200).json(result)
    } catch(err){
        res.status(501).json({message:"Something went wrong"})
        console.log(err)
    }
}

const updateApplication = async(req,res) =>{
    const id = req.params.id;
    const {status} = req.body;
    try{
        const updateApplication = {status,_id:id}
        const result = await ApplicationModel.findByIdAndUpdate(id,updateApplication,{new:true});
        res.status(201).json(result);
    }catch(err){
        res.status(501).json({message:"Something went wrong"})
        console.log(err)
    }
}

const getUserApplication = async(req,res) =>{
    try{
        const application = await ApplicationModel.find({user_id:req.params.id}).populate('job_id')
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

const getCompanyApplication = async(req,res) =>{
    try{
        const application = await ApplicationModel.find({job_id:req.params.id}).populate('user_id');
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

module.exports = {postApplication,updateApplication,getUserApplication,getCompanyApplication}
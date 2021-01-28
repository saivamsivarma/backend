const router = require('express').Router();
const Application = require('../models/applicationModel');

router.post("/create",async(req,res)=>{
    try{
        const {jobId,applicantId,status} = req.body;
        const existingappliation = await Application.FindOne({jobId:jobId,applicantId:applicantId});
        if(existingappliation)
            return res.status(400).json({msg:"You Have Already Applied to this Job"});

        const newApplication = new Application({
            jobId,
            applicantId,
            status
        });
        const savedApplication = await newApplication.save();
        res.status(200).json(savedApplication);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});

router.patch("/updateStatus/:applicationId",async(req,res)=>{
    try{
        const updateStatus = await Application.updateOne({_id:res.params.applicantId},{$set:status});
        res.status(200).json(updateStatus);
    } catch(err){
        res.status(500).json({error:err.message})
    }
});

router.get("/:userId",async(req,res)=>{
    try{
        const applications = await Application.find({applicantId:res.params.userId});
        res.status(200).json(applications)
    } catch(err){
        res.status(500).json({error:err.message})
    }
});

module.exports = router;
const router = require('express').Router();

const Job = require("../models/jobsModel");

router.post("/create", async (req, res) => {
    try {
        const { recruiter, title, description, industry, type, address, skills } = req.body
        if (!title || description || industry || type || address || skills)
            return res.status(400).json({ msg: "Not all Fields filled" })
        const newJob = new Job({
            recruiter,
            title,
            description,
            industry,
            type,
            address,
            skills
        });
        const savedJob = await newJob.save();
        res.json(savedJob);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/update/:jobId",  async (req, res) => {
    try {
        const updateJob = await Job.updateOne({ _id: res.params.jobId })
        res.status(200).json(updateJob)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
});

router.get("/:recruiterId", async (req, res) => {
    try {
        const jobs = await Job.find({ recruiter: res.params.recruiterId });
        res.status(200).json(jobs)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        const num = jobs.length;
        res.status(200).json({jobs,num});
    } catch (err) {
        res.status(500).json({ message: err })
    }
});

router.get("/find/:query", async (req, res) => {
    var query = req.params.query;
    try {
        const searchJob = await Job.find({
            $text: {
                $search: query
            }
        });
        const num = searchJob.length
        res.status(200).json({searchJob,num});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
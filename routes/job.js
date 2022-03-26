const router = require("express").Router();

const {postJob,updateJob, getJob, getAlljobs,getCompanyJobs,searchJob, voiceJobs} = require("../controllers/job");

router.post("/post_job",postJob);
router.get("/get_job/:id",getJob);
router.get("/get_jobs",getAlljobs);
router.get("/get_company_jobs/:id",getCompanyJobs)
router.put("/update_job/:id",updateJob);
router.get("/find_job/:query",searchJob);
router.get("/voice/:location/:type",voiceJobs)

module.exports = router
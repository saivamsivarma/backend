const router = require("express").Router()

const {postApplication, updateApplication, getUserApplication, getCompanyApplication} = require("../controllers/application");

router.post("/post_application",postApplication);
router.patch("/update_application/:id",updateApplication);
router.get("/get_user_application/:id",getUserApplication);
router.get("/get_company_application/:id",getCompanyApplication);

module.exports = router
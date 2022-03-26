const router = require("express").Router()

const {postReference, getUserData} = require("../controllers/reference");

router.post("/",postReference);
router.get("/",getUserData);

module.exports = router
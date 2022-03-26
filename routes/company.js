const router = require("express").Router();

const {postProfile, getProfile, updateProfile} = require("../controllers/company")
const {upload}  = require("../middleware/upload.js")

router.post("/profile",upload.single("logo"),postProfile);
router.get("/profile/:id",getProfile);
router.patch("/profile/:id",updateProfile);


module.exports = router
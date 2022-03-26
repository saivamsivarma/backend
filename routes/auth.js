const router = require("express").Router();

const  { signin, signup,googleLogin, signincompany } = require("../controllers/auth.js");

router.post("/signin",signin);
router.post("/signup",signup);
router.post("/signincompany",signincompany);
router.post('/googlelogin',googleLogin);

module.exports = router;
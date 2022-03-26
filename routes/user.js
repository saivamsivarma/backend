const router = require("express").Router();

const {postProfile, getProfile,updateProfile,updateImage,getUsers,searchUsers} =require("../controllers/user.js");
const {upload}  = require("../middleware/upload.js")

router.post('/profile',upload.single("image"),postProfile);
router.get('/profile/:id',getProfile);
router.get('/profile',getUsers)
router.patch('/profile/:id',updateProfile);
router.patch("/image/:id",upload.single("image"),updateImage);
router.get('/:query',searchUsers)

module.exports = router
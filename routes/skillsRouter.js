const router = require("express").Router();
const User = require("../models/userModel");


router.patch("/:id",async (req, res) => {
  try{
      const Skills = req.body
      const Skillset = await User.findOneAndUpdate({ _id: req.params.id },{$push:{skills:Skills}})
    console.log(Skillset)
    res.json({ msg: "Update Success!" })
  } catch(err){
    console.log(err)
  }
});


module.exports = router;
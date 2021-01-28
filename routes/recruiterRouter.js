const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Recruiter = require("../models/recruiterModel");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, passwordCheck } = req.body;

    if (!email || !password || !passwordCheck || !name)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingRecruiter = await Recruiter.findOne({ email: email });
    if (existingRecruiter)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!name) name = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newRecruiter = new Recruiter({
      email,
      password: passwordHash,
      name,
    });
    const savedRecruiter = await newRecruiter.save();
    res.json(savedRecruiter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // validate
      if (!email || !password)
        return res.status(400).json({ msg: "Not all fields have been entered." });
  
      const user = await Recruiter.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });
  
      const isMatch = await bcrypt.compare(password, recruiter.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (!verified) return res.json(false);
  
      const user = await recruiter.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:userId", async (req, res) => {
    try{
      const user = await Recruiter.findById(req.params.userId);
      res.status(200).json(user);
    }catch(err){
      res.status(500).json({error:err.message})
    }
  });

  module.exports = router;
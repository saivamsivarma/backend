const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

const AuthModel = require("../models/auth.js");
const UserModel = require("../models/user");

dotenv.config();

const secret = process.env.JWT_SECRET

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await AuthModel.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        if(oldUser.role==="employer") return res.status(500).json({message:"Please Login from Employer login"})

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const data = await UserModel.findById(oldUser._id)

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: data, token });
    } catch (err) {
        res.status(500).json({ message: "Something went worng" });
    }
};

const signup = async (req, res) => {
    const { name, email, password, confirmPassword,role } = req.body;

    try {

        if (!email || !password || !confirmPassword || !name || !role) return res.status(400).json({ message: "Not all fields have been entered." })

        if (password !== confirmPassword) return res.status(400).json({ message: "Enter the same password twice for verification." })

        if (password.length < 6) return res.status(400).json({ msg: "The password needs to be at least 6 characters long." });

        const oldUser = await AuthModel.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" })

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await AuthModel.create({ email, password: hashedPassword, name,role});

        const token = jwt.sign({ email: result.email, id: result._id }, secret,{ expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

const signincompany = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await AuthModel.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        if(oldUser.role==="user") return res.status(500).json({message:"Please Login from user login"})

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token,message:"Signin successful" });
    } catch (err) {
        res.status(500).json({ message: "Something went worng" });
    }
};


const googleLogin = async(req,res)=>{
    const { email} = req.body;
    try {
        const oldUser = await AuthModel.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went worng" });
    }
}
module.exports = {signup,signin,googleLogin,signincompany};
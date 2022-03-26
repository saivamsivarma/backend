const ReferenceModel = require("../models/reference");
const UserModel = require("../models/auth");
const sendEmail = require("../middleware/mail");

const postReference = async (req, res) => {
    const { job_id, user_id, email,company } = req.body
    console.log(job_id,user_id,email,company)
    try {
        const check = await ReferenceModel.findOne({ job_id, user_id, email })
        if (check) return res.status(500).json({ message: "You have already Refered this email Once" })

        const existinguser = await UserModel.findOne({ email })

        if (!existinguser) {
            sendEmail(email);
            const result = await ReferenceModel.create({ job_id, user_id, email,company })
            res.status(200).json(result)
            console.log(result)
        }
        else {
            const result = await ReferenceModel.create({ job_id, user_id, email,company })
            res.status(200).json(result)
            console.log(result)
        }
    } catch (err) {
        res.status(501).json({ message: "Something went wrong" })
        console.log(err)
    }
}

const getUserData = async (req, res) => {
    const email = req.body
    try {
        const check = await UserModel.findOne(email)
        if (!check) return res.status(404).json({ message: "Email not founded" })
        const user_email = check.email
        const data = await ReferenceModel.find({email:user_email}).populate('job_id','postName').populate(' user_id','name')
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

module.exports = { postReference, getUserData }
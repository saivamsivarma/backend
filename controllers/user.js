const UserModel = require("../models/user");


 const postProfile = async (req,res) => {
    const {_id,name, email,age, contact, occupation,clgcompName,education,role,seniority,experience,shareprofile,skills,geo_location} = req.body
    
    try {
        if(!{_id}) return res.status(400).json({message:"Invalid User id"})

        if(!{image:req.file.path}) return res.status(501).json({message:"Please upload your image"})

        const oldProfile  = await UserModel.findById({_id})

        if(oldProfile) return res.status(400).json({message:"An old profile exist with the this Id"})

        const result = await UserModel.create({_id,name, email,age, contact, occupation,clgcompName,education,role,seniority,experience,shareprofile,skills,geo_location,image:req.file.path})
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({ message: "Something went worng" });
        console.log(err)
    }
}

 const getProfile = async (req,res)=>{
    try {
        const user = await UserModel.findById({_id:req.params.id});
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

const getUsers= async (req,res)=>{
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

 const updateProfile = async(req,res) => {
    const {id} = req.params.id;
    const { contact,voicebot,shareprofile,country,city,skills} = req.body

    const updateProfile = {contact,voicebot,shareprofile,country,city,skills, _id:id};
    
    await UserModel.findByIdAndUpdate(id, updateProfile ,{new:true});

    res.json(updateProfile);
}

const updateImage = async(req,res)=>{
    const id = req.params.id;
    const image = req.file.path;
    try{
        if(!{_id:id}) return res.status(404).json({message:"Id not Founded"})
        
        const updateImage = {image, _id:id};

        const result = await UserModel.findByIdAndUpdate(id, updateImage ,{new:true});
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
        console.log(err)
    }
}

const searchUsers = async(req,res)=>{
    var query = req.params.query;
    try {
        const searchUser = await UserModel.find({
            $text: {
                $search: query
            }
        });
        res.status(200).json(searchUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }
}

module.exports = {postProfile,getProfile,updateProfile,updateImage,getUsers,searchUsers}
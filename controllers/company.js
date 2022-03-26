const CompanyModel = require("../models/company")

const postProfile = async(req,res) => {
    const{_id,companyname,contact,name,size,description} = req.body
    try{
        if(!_id) return res.status(404).json({message:"Id Not founded"});

        if(!{logo:req.file.path}) return res.status(501).json({message:"Please Upload your company logo"})
        const result = await CompanyModel.create({_id,companyname,contact,name,size,description,logo:req.file.path})
        res.status(200).json(result)
    } catch(err){
        res.status(500).json({ message: err.message });
        console.log(err)
    }
}

const getProfile = async(req,res) => {
    try {
        const company = await  CompanyModel.findById({_id:req.params.id});
        res.status(200).json(company);
        console.log(company)
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err)
    }
}

const updateProfile = async(req,res) => {
    const id = req.params.id
    try{
        if(!{_id:id}) return res.status(404).json({message:"Id not founded"})
        const updateProfile = {companyname,name,contact,size,description,_id:id};
        const result = await CompanyModel.findByIdAndUpdate(id,updateProfile,{new:true});
        res.status(201).json(result)
    }catch(err){
        res.status(501).json({messgae:"Something went wrong"})
        console.log(err)
    }
}

module.exports = {postProfile,getProfile,updateProfile}
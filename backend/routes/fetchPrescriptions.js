import Prescription from "../models/Prescription.js";

const fetchPrescriptions= async (req,res)=>{
    const email=req.params.email;
    if(!email){
        return res.status(400).json({error:"Email is required"});
    }
    try{
        const data=await Prescription.find({email}).sort({createdAt:-1});
        if(data.length==0){
            return res.status(404).json({message:"No prescriptions found for this email"});
        }
        return res.status(200).json(data);

    }catch(err){
        console.error("Error fetching prescriptions:", err);
        res.status(500).json({error:"Internal server error"});
    }



}
export { fetchPrescriptions };
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
export const signup=async(req,res)=>{
    const {email,name,password}=req.body;
    if(!email||!name||!password){
        return res.status(400).json({error:"All fields are reuired"});
    }
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json("User already exists");
    }
    const passwordhashed=await bcrypt.hash(password,10);
    const newUser=new User({
        email,
        name,
        password:passwordhashed,
    })
    await newUser.save();
    return res.status(200).json({message:"Signup successful",email:email});



}
export const login=async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({error:"All fields are required"});
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({error:"User not found"});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({error:"Wrong credintials"});
    }
    const token=generateToken({email});
    return res.status(200).json({message:"Login successful",token:token,email:email});

}
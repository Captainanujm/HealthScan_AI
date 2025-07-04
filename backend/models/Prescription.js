import mongoose from "mongoose";
const prescriptionSchema=new mongoose.Schema({
    imageURL:String,
    extractedText:String,
    summary:[{
        medicinename:String,
        dosage:String,
        frequency:[String],
    }],
    email:String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const Prescription=mongoose.model("Prescription",prescriptionSchema);
export default Prescription;

import Prescription from "../models/Prescription.js";


const saveSummary = async (req, res) => {
  const { imageURL, extractedText, summary, email } = req.body;
  if (!imageURL || !extractedText || !summary || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newPrescription = new Prescription({
    imageURL,
    extractedText,
    summary,
    email,
  });

  newPrescription
    .save()
    .then((savedPrescription) => {
      res.status(200).json({ message: "Prescription saved successfully", savedPrescription });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error saving prescription", details: err.message });
    });
};

export default saveSummary;
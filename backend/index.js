import express from "express";
import cors from "cors"
import fs from "fs"
import multer from "multer"
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import Tesseract from "tesseract.js"
import { extractMedicinesFromText } from './gemini/extractMedicines.js';
import { parseGeminiResult, generateReadableSummary } from './gemini/parseGeminiResult.js';
const app=express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT=3000;
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const uploadedPath="uploads/";
        fs.mkdirSync(uploadedPath,{recursive:true});
        cb(null,uploadedPath);
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    }
});
const upload=multer({storage:storage});
app.post("/upload",upload.single("image"),(req,res)=>{
    if(!req.file){
        res.send("No file uploaded");
        
    }else{
       Tesseract.recognize(req.file.path,'eng+hin',{ logger:info=>console.log(info) }).then((result) => {
        const extractedText = result.data.text;
        res.send("Extracted Text: " + extractedText);
       }).catch((err) => {
        res.status(500).send("Error processing image: " + err.message);
       });
    }
});
app.post('/analyze', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
   
    const rawResponse = await extractMedicinesFromText(text);
    const parsed = parseGeminiResult(rawResponse);
    const summary = generateReadableSummary(parsed);

    res.json({
      parsed,
      summary,
      rawText: text,
    });

  } catch (err) {
    console.error("/analyze error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(PORT,(req,res)=>{
    console.log("Server is running on port", PORT);
})
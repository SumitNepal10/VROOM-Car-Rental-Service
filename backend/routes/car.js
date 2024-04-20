import Car from "../models/Car.js";
import express from "express";
import multer from "multer";
import { fileURLToPath } from "url"; // Import the fileURLToPath function
import { dirname, join, extname } from "path"; // Import the dirname and join functions

const __filename = fileURLToPath(import.meta.url); // Get the filename using import.meta.url
const __dirname = dirname(__filename); // Get the directory name using dirname

const carRouter = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "../uploads")); // Use __dirname to construct the destination path
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname)); // Use the extname function to get the file extension
  },
});
const upload = multer({ storage: storage });

carRouter.post("/addcar", upload.single("picture"), async (req, res) => {
  try {
    const { modelName, price, seats, system, haveAc } = req.body;
    const { filename } = req.file;
  
    const newCar = new Car({
      modelName,
      price,
      seats,
      system,
      haveAc,
      picture: filename,
    });

    await newCar.save();

    return res.json({ status: true, message: "Record registered" });
  } catch (error) {
    console.error("Error adding car:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { carRouter as carRoute };

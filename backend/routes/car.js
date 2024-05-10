import express from "express";
import multer from "multer";
import Car from "../models/Car.js";
import { Counter } from "../models/Counter.js";

const carRouter = express.Router();

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
});

carRouter.post("/addcar", upload.single("picture"), async (req, res) => {
  try {
    // Fetch and increment the counter
    const counter = await Counter.findOneAndUpdate(
      { name: "carId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const carId = counter.seq; // The next carId
    const { modelName, price, seats, system, haveAc, user, status } = req.body;
    const pictureData = req.file.buffer;
    const pictureType = req.file.mimetype;

    const newCar = new Car({
      modelName,
      price,
      seats,
      system,
      haveAc,
      user,
      carId,
      status,
      picture: {
        data: pictureData,
        contentType: pictureType,
      },
    });

    await newCar.save();

    return res.json({ status: true, message: "Car added successfully" });
  } catch (error) {
    console.error("Error adding car:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// Route to get cars for a user
carRouter.get("/getCars/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const cars = await Car.find({ user: username });

    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No cars found for the user" });
    }

    const carsData = cars.map((car) => ({
      carId: car.carId,
      modelName: car.modelName,
      price: car.price,
      seats: car.seats,
      system: car.system,
      haveAc: car.haveAc,
      status: car.status,
      picture: {
        data: car.picture.data.toString("base64"),
        contentType: car.picture.contentType,
      },
    }));

    res.json(carsData);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to edit a car
carRouter.post("/editCar", upload.single("picture"), async (req, res) => {
  try {
    const { carId, modelName, price, seats, system, haveAc } = req.body;

    const updatedData = {
      modelName,
      price,
      seats,
      system,
      haveAc,
    };

    if (req.file) {
      updatedData.picture = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedCar = await Car.findOneAndUpdate(
      { carId },
      updatedData,
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ status: true, message: "Car updated successfully", updatedCar });
  } catch (error) {
    console.error("Error editing car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to delete a car
carRouter.delete("/deleteCar/:carId", async (req, res) => {
  try {
    const { carId } = req.params;

    const deletedCar = await Car.findOneAndDelete({ carId });

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ status: true, message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { carRouter as carRoute };

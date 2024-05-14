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

    const updatedCar = await Car.findOneAndUpdate({ carId }, updatedData, {
      new: true,
    });

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

// Route to get a detail of a single car
carRouter.get("/getCar/:carId", async (req, res) => {
  try {
    const { carId } = req.params;
    const car = await Car.find({ carId });

    if (!car || car.length === 0) {
      return res.status(404).json({ message: "No cars found for the user" });
    }

    const carsData = car.map((car) => ({
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
    console.error("Error fetching car", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Router to get a name of a car
carRouter.post("/getCars", async (req, res) => {
  try {
    const { carIds } = req.body;

    // Validate request data
    if (!Array.isArray(carIds) || carIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or empty 'carIds' array" });
    }

    // Fetch cars based on the array of carIds
    const cars = await Car.find({ carId: { $in: carIds } });

    if (!cars || cars.length === 0) {
      return res
        .status(404)
        .json({ message: "No cars found for the given IDs" });
    }

    // Map fetched cars data
    const carsData = cars.map((car) => ({
      vehicle: car.modelName,
    }));

    res.json(carsData);
  } catch (error) {
    console.error("Error fetching cars", error);
    res
      .status(500)
      .json({ message: "Failed to fetch cars. Please try again later." });
  }
});

// Router to get a car information
carRouter.get("/getCarInfo/:carId", async (req, res) => {
  try {
    const { carId } = req.params;

    const car = await Car.findOne({ carId });

    if (!car) {
      return res
        .status(404)
        .json({ message: "No car found with the specified ID" });
    }

    const carData = {
      modelName: car.modelName,
      price: car.price,
      picture: {
        data: car.picture.data.toString("base64"),
        contentType: car.picture.contentType,
      },
    };

    res.json(carData);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Router to update the car status to Rented
carRouter.post("/updateCarStatus/:carId", async (req, res) => {
  const { carId } = req.params;

  try {
    // Find the car by ID and update its status to "Rented"
    const updatedCar = await Car.findOneAndUpdate(
      { carId: carId },
      { $set: { status: "Rented" } },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res.status(200).json({
      success: true,
      message: "Car status updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    console.error("Error updating car status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// router to get the total number of Car
carRouter.get("/totalCar", async (req, res) => {
  try {
    const totalCar = await Car.collection.countDocuments();
    if (totalCar === 0) {
      return res.json(0);
    }

    res.json(totalCar);
  } catch (error) {
    console.error("Error fetching Car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router to get the toal available cars
carRouter.get("/availableCar", async (req, res) => {
  try {
    const availabelCar = await Car.collection.countDocuments({
      status: "Rented",
    });
    if (availabelCar === 0) {
      return res.json(0);
    }

    res.json(availabelCar);
  } catch (error) {
    console.error("Error  Total Car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get cars for a user
carRouter.get("/availableCars/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const cars = await Car.find({ user: username, status: "available" });

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

export { carRouter as carRoute };

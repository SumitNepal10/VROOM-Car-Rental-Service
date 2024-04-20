import Car from "../models/Car.js";
import express from "express";
import multer from "multer";

const carRouter = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

carRouter.post("/addcar", upload.single("picture"), async (req, res) => {
  try {
    const { modelName, price, seats, system, haveAc, user } = req.body;
    const pictureData = req.file.buffer;
    const pictureType = req.file.mimetype;

    const newCar = new Car({
      modelName,
      price,
      seats,
      system,
      haveAc,
      user,
      picture: {
        data: pictureData,
        contentType: pictureType,
      },
    });

    await newCar.save();

    return res.json({ status: true, message: "Record registered" });
  } catch (error) {
    console.error("Error adding car:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Router to get cars by user name
carRouter.get("/getCars/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const cars = await Car.find({ user: username });

    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No cars found for the user" });
    }

    // Extract necessary fields from cars
    const carsData = cars.map((car, index) => {
      const { modelName, price, seats, system, haveAc, picture } = car;
      
      const pictureData = picture.data.toString("base64");
      const pictureType = picture.contentType;

      return {
        modelName,
        price,
        seats,
        system,
        haveAc,
        picture: {
          data: pictureData,
          contentType: pictureType,
        },
      };
    });

    return res.json(carsData);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

carRouter.post("/editCar", async (req, res) => {
  return res.json({status: true})
})

export { carRouter as carRoute };

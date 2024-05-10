import express from 'express';
import multer from 'multer';
import { Renter } from '../models/Renter.js';

const renterRouter = express.Router();

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
});

// Route to add a new renter
renterRouter.post('/newRenter', upload.single('driverLicense'), async (req, res) => {
  try {
    const { carId, firstName, lastName, email, phone } = req.body;
    const driverLicenseData = req.file ? req.file.buffer : null;
    const driverLicenseType = req.file ? req.file.mimetype : null;

    const newRenter = new Renter({
      carId,
      firstName,
      lastName,
      email,
      phone,
      driverLicense: {
        data: driverLicenseData,
        contentType: driverLicenseType,
      },
    });

    await newRenter.save();

    return res.json({ status: true, message: 'Renter added successfully' });
  } catch (error) {
    console.error('Error adding renter:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get all renters
renterRouter.get('/getRenters', async (req, res) => {
  try {
    const renters = await Renter.find();

    if (!renters || renters.length === 0) {
      return res.status(404).json({ message: 'No renters found' });
    }

    const rentersData = renters.map((renter) => ({
      firstName: renter.firstName,
      lastName: renter.lastName,
      email: renter.email,
      phone: renter.phone,
    }));

    res.json(rentersData);
  } catch (error) {
    console.error('Error fetching renters:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export { renterRouter as renterRoute };

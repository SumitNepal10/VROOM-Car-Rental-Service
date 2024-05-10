import mongoose from 'mongoose';

const renterSchema = new mongoose.Schema({
  carId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  driverLicense: {
    data: Buffer,
    contentType: String,
  },
});

const Renter = mongoose.model('Renter', renterSchema);

export { Renter };

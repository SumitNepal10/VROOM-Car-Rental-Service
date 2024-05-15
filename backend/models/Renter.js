import mongoose from 'mongoose';

const renterSchema = new mongoose.Schema({
  fullName: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: false },
  phoneNumber: { type: String, required: true, unique: false },
  pickupLocation: { type: String, required: true, unique: false },
  dropOffLocation: { type: String, required: true, unique: false },
  pickupDate: { type: String, required: true, unique: false },
  dropOffDate: { type: String, required: true, unique: false },
  isPaid: { type: Boolean, required: true, unique: false },
  userToBook: { type: String, required: true, unique: false },
  carId: { type: String, required: true, unique: false },
  driverLicense: {
    data: Buffer,
    contentType: String,
  },
});

const Renter = mongoose.model('Renter', renterSchema);

export { Renter };

import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  carId: { type: String, required: true, unique: false },
  amount: { type: String, required: true, unique: false },
  paymentNumber: { type: String, required: true, unique: false },
  remarks: { type: String, required: true, unique: false },
  mode: { type: String, required: true, unique: false },
  username: { type: String, required: true, unique: false },
  paymentDate: { type: String, required: true, unique: false },
});

const Payment = mongoose.model("Payment", paymentSchema);

export { Payment };

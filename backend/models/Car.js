import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  modelName: { type: String, required: true, unique: false },
  price: { type: String, required: true, unique: false },
  seats: { type: Number, required: true, unique: false },
  system: { type: String, required: true, unique: false },
  haveAc: { type: Boolean, required: true, unique: false },
});

const Car = mongoose.model('Car', CarSchema);
export default Car;

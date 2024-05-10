import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Countermodel = mongoose.model("Counter", CounterSchema);

export {Countermodel as Counter};

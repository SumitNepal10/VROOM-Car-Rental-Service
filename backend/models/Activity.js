import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  username: { type: String, required: true },
  activity: { type: String, required: true },
  date: { type: String, required: true, unique: false },
});

const Activity = mongoose.model("Activity", activitySchema);

export { Activity };

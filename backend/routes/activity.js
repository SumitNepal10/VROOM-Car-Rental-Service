import express from "express";
import { Activity } from "../models/Activity.js";
import Car from "../models/Car.js";

const activityRouter = express.Router();

// router to post the activity
activityRouter.post("/addActivity", async (req, res) => {
  try {
    const { username, activity, date } = req.body.activityData;
    const newActivity = new Activity({
      username,
      activity,
      date,
    });

    try {
      await newActivity.save();
      return res.json({ status: true, message: "Activity data saved" });
    } catch (error) {
      console.error("Error saving activity:", error);
      return res.status(500).json({ message: "Error saving activity data" });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// router to get the activity
activityRouter.get("/getActivity", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { activityRouter as activityRoute };

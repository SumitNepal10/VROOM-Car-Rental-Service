import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRouter } from "./routes/user.js";
import { carRoute } from "./routes/car.js";

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/auth", UserRouter);
app.use("/car", carRoute);

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL, {
  })
  .then(() => {
    console.log(`Connected to MongoDB${process.env.DB_URL}`);
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

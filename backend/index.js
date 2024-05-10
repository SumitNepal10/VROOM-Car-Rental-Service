import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRouter } from './routes/user.js';
import { carRoute } from './routes/car.js';
import { renterRoute } from './routes/renter.js';

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

app.use(
  cors({
    origin: 'http://localhost:3000', 
    credentials: true,
  })
);

app.use('/auth', UserRouter);
app.use('/car', carRoute);
app.use('/renter', renterRoute);

// Error handling middleware
app.use((err, res) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Connect to MongoDB with error handling and additional options
mongoose
  .connect(process.env.DB_URL, {

  })
  .then(() => {
    console.log(`Connected to MongoDB at ${process.env.DB_URL}`);
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown on termination signals
const gracefulShutdown = () => {
  console.log('Received shutdown signal, closing server...');
  server.close(() => {
    mongoose.disconnect().then(() => {
      console.log('Disconnected from MongoDB, exiting...');
      process.exit(0);
    });
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

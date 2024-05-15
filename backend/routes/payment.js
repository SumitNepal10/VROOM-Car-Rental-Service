import express from "express";
import { Payment } from "../models/Payment.js"; // Check the path

const PaymentRouter = express.Router();

// Route to update the renter information
PaymentRouter.post("/paymentDetails", async (req, res) => {
  try {
    const {
      carId,
      amount,
      paymentNumber,
      remarks,
      mode,
      username,
      paymentDate,
    } = req.body;

    // Create a new Payment instance
    const newPayment = new Payment({
      carId,
      amount,
      paymentNumber,
      remarks,
      mode,
      username,
      paymentDate,
    });

    // Save the new Payment to the database
    await newPayment.save();

    // Respond with success message
    res.json({ status: true, message: "Payment details saved successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error saving payment details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to send the price paid by the user
PaymentRouter.post("/getAmount", async (req, res) => {
  try {
    const { carIds } = req.body;

    // Validate request data
    if (!Array.isArray(carIds) || carIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or empty 'carIds' array" });
    }

    // Fetch payment amounts based on the array of carIds
    const amounts = await Payment.find({ carId: { $in: carIds } });

    if (!amounts || amounts.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the given car IDs" });
    }

    // Map fetched payment amounts data
    const amountData = amounts.map((amount) => ({
      amount: amount.amount,
    }));

    res.json(amountData);
  } catch (error) {
    console.error("Error fetching payment amounts:", error);
    res.status(500).json({
      message: "Failed to fetch payment amounts. Please try again later.",
    });
  }
});

PaymentRouter.get("/getPayments", async (req, res) => {
  try {
    // Fetch payment amounts based on the array of carIds
    const payments = await Payment.find();

    if (!payments || payments.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the given car IDs" });
    }

    // Map fetched payment amounts data
    const paymentData = payments.map((payment) => ({
      username: payment.username,
      amount: payment.amount,
      mode: payment.mode,
      paymentDate: payment.paymentDate,
    }));

    res.json(paymentData);
  } catch (error) {
    console.error("Error fetching payment amounts:", error);
    res.status(500).json({
      message: "Failed to fetch payment amounts. Please try again later.",
    });
  }
});

export { PaymentRouter as paymentRoute };

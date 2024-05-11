import express from "express";
import { Payment } from "../models/Payment.js"; // Check the path

const PaymentRouter = express.Router();

// Route to update the renter information
PaymentRouter.post("/paymentDetails", async (req, res) => {
  try {
    const { carId, amount, paymentNumber, remarks } = req.body;

    // Create a new Payment instance
    const newPayment = new Payment({
      carId,
      amount,
      paymentNumber,
      remarks,
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

export { PaymentRouter as paymentRoute };

import express from "express";
import nodemailer from "nodemailer";

const contactRouter = express.Router();

contactRouter.post("/sendMail", async (req, res) => {
  const { category, fullName, email, phone, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.email,
      subject: `Feedback for ${category} in car rental website`,
      text: `Feedback from: ${fullName}, Email: ${email}, Phone: ${phone}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        return res.json({ status: true, message: "Email sent" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { contactRouter };

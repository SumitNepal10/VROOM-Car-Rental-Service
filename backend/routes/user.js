import express from "express";
import bcrypt, { hash } from "bcrypt";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

router.post("/signup", async (req, res) => {
  const { username, email, password, phone } = req.body;

  // Check if a user with the same username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Username or email already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
    phone,
  });

  await newUser.save();
  return res.json({ status: true, message: "record registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "user is not registered" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({
    status: true,
    message: "login sucessfull",
    username: user.username,
  });
});

router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not registered" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "30m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });

    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Reset Your Password",
      text: `Reset Your Password`,
      title: "Password Reset",
      html: `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);">
                  <h1 style="color: #333333; text-align: center;">🔑 Password Reset</h1>
                  <p style="color: #666666; text-align: center;">You've requested to reset your password.</p>
                  <div style="text-align: center;">
                    <a href="http://localhost:3000/Reset/${token}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Reset Password</a>
                  </div>
                </div>
              </body>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "Error sending email" });
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashpassword });
    return res.json({ status: true, message: "Password updated" });
  } catch (error) {
    console.log(error);
    return res.json("Invalid token");
  }
});

// Fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// router to get user data
router.get("/getUser/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "No Data for the user" });
    }

    const userData = {
      name: user.username,
      email: user.email,
      phone: user.phone,
    };

    res.json(userData);
  } catch (error) {
    console.error("Error fetching renter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router to get the total number of user
router.get("/totalUser", async (req, res) => {
  try {
    const totalUser = await User.collection.countDocuments();
    if (totalUser === 0) {
      return res.json(0);
    }
    
    res.json(totalUser);
  } catch (error) {
    console.error("Error fetching User number:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as UserRouter };

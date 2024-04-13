import express from "express";
import bcrypt, { hash } from "bcrypt";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

router.post("/signup", async (req, res) => {
  const { username, email, password, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "user already exist" });
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
  console.log(email);
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
  return res.json({ status: true, message: "login sucessfull" });
});

router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not registered" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nepalsumit30@gmail.com",
        pass: "aqph vtlm crzu cclx",
      },
    });

    var mailOptions = {
      from: "nepalsumit30@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Change the Password`,
      html: `<p>Follow the following link to change the password</p>
      <button><a href="http://localhost:3000/reset/${token}">Click Here</a></button>`,
    };

    // var mailOptions = {
    //   from: "nepalsumit30@gmail.com",
    //   to: email,
    //   subject: "Reset Password",
    //   text: `Change the Password`,
    //   html: `
    //     <title>Password Reset</title>
    //     <body>
    //       <div style="text-align: center;">
    //         <h1>Password Reset</h1>
    //         <p>You've requested to reset your password.</p>
    //         <p>Click the following link to reset your password:</p>
    //         <a href="http://localhost:3000/ResetPassword/${token}">Reset Password</a>
    //       </div>
    //     </body>
    //   `,
    // };
    
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
    const hashpassword = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate({_id: id}, {password: hashpassword})
    return res.json({status: true, message: "Password updated"})

  } catch (error) {
    console.log(error)
    return res.json("Invalid token")
  }
});

export { router as UserRouter };

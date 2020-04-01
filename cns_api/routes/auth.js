const express = require("express");
const User = require("../models/User");
const { sendResetPasswordEmail } = require("../mailer");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", (req, res) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      if (user.confirmed) {
        res.json({ answer: { user: user.toAuthJSON() } });
      } else {
        res.json({ answer: { verification: "Użytkownik nie zweryfikowany." } });
      }
    } else {
      res
        .status(400)
        .json({ errors: { global: "Nieprawidłowy email lub hasło." } });
    }
  });
});

router.post("/confirmation", (req, res) => {
  const token = req.body.token;
  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  ).then(user => res.json({ user: user ? user.toAuthJSON() : user }));
});

router.post("/reset_password_request", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      user.resetPasswordToken = user.generateResetPasswordToken();
      user.save().then(updatedUser => {
        sendResetPasswordEmail(updatedUser);
        res.json({});
      });
    } else {
      res.status(400).json({
        errors: { global: "Nie ma użytkownika o takim adresie email" }
      });
    }
  });
});

router.post("/validate_token", (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
    if (err) res.status(401).json({ errors: { global: "Nieprawidłowy link" } });

    User.findOne({ resetPasswordToken: req.body.token }).then(user => {
      if (user) res.json({});
      else res.status(404).json({});
    });
  });
});

router.post("/reset_password", (req, res) => {
  const { password, token } = req.body.data;
  jwt.verify(token, process.env.JWT_SECRET, err => {
    if (err) res.status(401).json({ errors: { global: "Nieprawidłowy link" } });

    User.findOne({ resetPasswordToken: token }).then(user => {
      if (user) {
        user.setPassword(password);
        user.resetPasswordToken = "";
        //sendNotficationAboutPasswordEmail(user);
        user.save().then(() => res.json({}));
      } else {
        res.status(404).json({ errors: { global: "Nieprawidłowy link" } });
      }
    });
  });
});

module.exports = router;

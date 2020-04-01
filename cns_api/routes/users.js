const express = require("express");
const User = require("../models/User");
const parseErrors = require("../utils/parseErrors");
const { sendConfirmationEmail } = require("../mailer");
const request = require("request");

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password, creationDate, captcha } = req.body.user;
  const secretKey = "6Lc8P8QUAAAAANBdQNi-HLeCiNvI11uOLn_rmuMV";
  const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

  request(verifyURL, (googleErr, googleRes, googleBody) => {
    googleBody = JSON.parse(googleBody);
    if (googleBody.success !== undefined && !googleBody.success) {
      res.status(400).json({
        errors: { global: "Błąd weryfikacji captchy. Spróbuj ponownie." }
      });
    } else {
      const user = new User({ email, creationDate });
      user.setPassword(password);
      user.setConfirmationToken();
      user
        .save()
        .catch(err => {
          res.status(400).json({ errors: parseErrors(err.errors) });
        })
        .then(userRecord => {
          sendConfirmationEmail(userRecord);
          res.json({ user: userRecord.toAuthJSON() });
        });
    }
  });
});

module.exports = router;

const express = require("express");
const User = require("../models/User");
const { sendConfirmationEmail } = require("../mailer");
const request = require("request");

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password, creationDate, captcha } = req.body.user;
  const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_KEY}&response=${captcha}`;

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
          res
            .status(400)
            .json({ errors: { global: "Wystąpił błąd. Spróbuj ponownie." } });
        })
        .then(userRecord => {
          sendConfirmationEmail(userRecord);
          res.json({ user: userRecord.toAuthJSON() });
        });
    }
  });
});

module.exports = router;

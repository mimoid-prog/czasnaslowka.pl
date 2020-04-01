const express = require("express");
const Language = require("../models/Languages");

const router = express.Router();

router.post("/", (req, res) => {
  Language.find().then(data => {
    const languages = [];
    data.forEach(item => {
      languages.push({
        languageName: item.languageName,
        language: item.language,
        image: item.image
      });
    });
    res.json({ languages });
  });
});

module.exports = router;

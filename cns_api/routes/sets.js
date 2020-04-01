const express = require("express");
const User = require("../models/User");
const Language = require("../models/Languages");
const Set = require("../models/Sets");

const router = express.Router();

router.post("/", (req, res) => {
  const set = req.body.set;

  const newSet = new Set({
    name: set.name,
    icon: "new",
    language: set.language,
    owner: "admin",
    foreignWords: set.foreignWords,
    polishWords: set.polishWords
  });

  newSet.save().then(() => {
    Language.find({ language: set.language }).then(lang => {
      if (lang.length === 0) {
        const newLang = new Language({
          languageName: set.languageName,
          language: set.language,
          image: set.language
        });

        newLang.save().then(() => res.json({ message: "Dodano set i język" }));
      } else {
        res.json({ message: "Dodano set" });
      }
    });
  });
});

router.post("/fetchGuestSet", (req, res) => {
  const setID = req.body.id;

  Set.findOne({ _id: setID }).then(set => {
    if (set) {
      if (set.owner == "admin") {
        res.json({ set: set });
      } else {
        res.status(401).json({
          errors: { global: "Dlaczego pobierasz nie swój zestaw?" }
        });
      }
    } else {
      res.status(400).json({ errors: { global: "Ten zestaw nie istnieje." } });
    }
  });
});

router.post("/fetchGuestSets", (req, res) => {
  const lang = req.body.lang;
  Set.find({ owner: "admin", language: lang })
    .then(data => {
      if (data.length !== 0) {
        const sets = [];
        var counter = data.length;
        data.forEach(item => {
          sets.push({
            id: item._id,
            name: item.name,
            icon: item.icon,
            quantityOfWords: item.polishWords.length
          });

          counter -= 1;
          if (counter === 0) {
            res.json({ sets });
          }
        });
      } else {
        res.json({ sets: false });
      }
    })
    .catch(() => res.status(400).json({ error: "error" }));
});

module.exports = router;

const express = require("express");
const User = require("../models/User");
const Language = require("../models/Languages");
const Set = require("../models/Sets");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
  const userID = req.currentUser._id;
  User.findOne({ _id: userID }).then(user => {
    if (user.rank === "mode") {
      res.json({ rank: "mode" });
    } else {
      res.status(400);
    }
  });
});

router.post("/addNewLanguage", (req, res) => {
  const lang = req.body.lang;
  const newLang = new Language({
    languageName: lang.languageName,
    language: lang.language,
    image: lang.image
  });

  newLang
    .save()
    .then(() => {
      Language.find()
        .then(languages => res.json({ languages }))
        .catch(() =>
          res.status(400).json({ error: "Nie udało się pobrać języków." })
        );
    })
    .catch(() =>
      res.status(400).json({ error: "Nie udało się dodać języka." })
    );
});

router.post("/removeLanguage", (req, res) => {
  const languageName = req.body.languageName;

  Language.deleteOne({ languageName })
    .then(() => {
      Language.find()
        .then(languages => res.json({ languages }))
        .catch(() =>
          res.status(400).json({ error: "Nie udało się pobrać języków." })
        );
    })
    .catch(() =>
      res.status(400).json({ error: "Nie udało się usunąć języka" })
    );
});

router.post("/removeSet", (req, res) => {
  const setID = req.body.setID;
  const lang = req.body.lang;

  Set.deleteOne({ _id: setID })
    .then(() => {
      Set.find({ language: lang, owner: "admin" })
        .then(sets => res.json({ sets }))
        .catch(() =>
          res.status(400).json({ error: "Nie udało się pobrać setów." })
        );
    })
    .catch(() => res.status(400).json({ error: "Nie udało się usunąć seta" }));
});

router.post("/fetchSets", (req, res) => {
  const lang = req.body.lang;
  Set.find({ language: lang, owner: "admin" })
    .then(sets => res.json({ sets }))
    .catch(() =>
      res.status(400).json({ error: "Nie udało się pobrać setów. " })
    );
});

router.post("/fetchSet", (req, res) => {
  const setID = req.body.setID;
  Set.find({ _id: setID })
    .then(set => res.json({ set }))
    .catch(() =>
      res.status(400).json({ error: "Nie udało się pobrać seta. " })
    );
});

router.post("/editSet", (req, res) => {
  const set = req.body.set;
  Set.findOneAndUpdate(
    { _id: set._id },
    {
      name: set.name,
      icon: set.icon,
      language: set.language,
      foreignWords: set.foreignWords,
      polishWords: set.polishWords
    },
    { new: true }
  )
    .then(set => res.json({ set }))
    .catch(() =>
      res.status(400).json({ error: "Edycja setu nie powiodła się" })
    );
});

router.post("/createSet", (req, res) => {
  const set = req.body.set;

  const newSet = new Set({
    name: set.name,
    icon: set.icon,
    language: set.language,
    owner: "admin",
    foreignWords: set.foreignWords,
    polishWords: set.polishWords
  });

  newSet
    .save()
    .then(set => res.json({ set }))
    .catch(() =>
      res.status(400).json({ error: "Nie udało się utworzyć nowego zestawu" })
    );
});

module.exports = router;

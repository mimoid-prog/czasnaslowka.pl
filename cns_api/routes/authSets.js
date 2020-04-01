const express = require("express");
const User = require("../models/User");
const Set = require("../models/Sets");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();
router.use(authenticate);

router.post("/", (req, res) => {
  const userID = req.currentUser._id;
  fetchUserSets(userID).then(userSets => res.json({ sets: userSets }));
});

router.post("/fetchUserSet", (req, res) => {
  const userID = req.currentUser._id;
  const setID = req.body.id;

  Set.findOne({ _id: setID }).then(set => {
    if (set) {
      if (set.owner == userID) {
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

router.post("/createSet", (req, res) => {
  const userID = req.currentUser._id;
  const set = req.body.set;

  const newSet = new Set({
    name: set.name,
    icon: set.language,
    language: set.language,
    owner: req.currentUser._id,
    foreignWords: set.foreignWords,
    polishWords: set.polishWords
  });

  newSet.save().then(record => {
    fetchUserSets(userID).then(userSets => res.json({ sets: userSets }));
  });
});

router.post("/removeSet", (req, res) => {
  const userID = req.currentUser._id;
  const id = req.body.id;

  Set.findOne({ owner: userID }).then(isItUserSet => {
    if (isItUserSet) {
      Set.deleteOne({ _id: id }).then(() => {
        fetchUserSets(userID).then(userSets => res.json({ sets: userSets }));
      });
    } else {
      res.status(401).json({
        errors: { global: "Dlaczego próbujesz usunąć nie swój zestaw?" }
      });
    }
  });
});

router.post("/editSet", (req, res) => {
  const userID = req.currentUser._id;
  const set = req.body.set;

  Set.findOne({ owner: userID }).then(isItUserSet => {
    if (isItUserSet) {
      Set.findOneAndUpdate(
        { _id: set.id },
        {
          name: set.name,
          icon: set.language,
          language: set.language,
          foreignWords: set.foreignWords,
          polishWords: set.polishWords
        },
        { new: true }
      ).then(() => {
        fetchUserSets(userID).then(userSets => res.json({ sets: userSets }));
      });
    } else {
      res.status(401).json({
        errors: { global: "Dlaczego próbujesz edytować nie swój zestaw?" }
      });
    }
  });
});

function fetchUserSets(id) {
  return new Promise((resolve, reject) => {
    const sets = [];

    Set.find({ owner: id }).then(data => {
      var counter = data.length;
      if (data.length !== 0) {
        data.forEach(item => {
          sets.push({
            id: item._id,
            name: item.name,
            icon: item.icon
          });
          counter -= 1;
          if (counter == 0) {
            resolve(sets);
          }
        });
      } else {
        resolve(false);
      }
    });
  });
}

module.exports = router;

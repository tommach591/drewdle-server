const fs = require("fs");
const express = require("express");
const router = express.Router();

const Word = require("../../schemas/Word");

let categories;
fs.readFile(`${process.cwd()}/assets/categories.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  categories = [...data.split("\n")];
});

router.get("/get/:date", (req, res) => {
  const { date } = req.params;

  console.log(`Hit at ./api/word/get/${date}`);
  const currentTime = new Date(date);
  const currentDay = `${currentTime.getFullYear()}${
    currentTime.getMonth() + 1
  }${currentTime.getDate()}`;

  Word.findOne({ date: currentDay })
    .then((word) => {
      res.json(word);
    })
    .catch((err) => res.status(404).json({ word_not_found: "No word" }));
});

router.post("/daily", (req, res) => {
  console.log(`Hit at ./api/word/daily`);
  const { date } = req.body;

  const currentTime = new Date(date);
  const currentDay = `${currentTime.getFullYear()}${
    currentTime.getMonth() + 1
  }${currentTime.getDate()}`;

  const word =
    categories[Math.floor(Math.random() * categories.length)].toUpperCase();

  const newWord = new Word({
    date: currentDay,
    word: word,
  });

  newWord.save().then((word) => {
    return res.json(word);
  });
});

router.delete("/deleteAll", (req, res) => {
  console.log(`Hit at ./api/word/deleteAll`);

  Word.deleteMany({}).exec();
  return res.json({ success: true });
});

module.exports = router;

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
  console.log(categories);
});

router.get("/get/:date", (req, res) => {
  const { date } = req.params;

  console.log(`Hit at ./api/word/get/${date}`);

  Word.findOne({ date: date })
    .then((word) => {
      res.json(word);
    })
    .catch((err) => res.status(404).json({ word_not_found: "No word" }));
});

router.post("/daily", (req, res) => {
  console.log(`Hit at ./api/word/daily`);
  const currentTime = new Date();
  const currentDay = new Date(currentTime.toDateString());
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

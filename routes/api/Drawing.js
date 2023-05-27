const express = require("express");
const router = express.Router();

const Word = require("../../schemas/Word");
const Drawing = require("../../schemas/Drawing");

router.get("/get/:sort/:limit/:offset", (req, res) => {
  const { sort, limit, offset } = req.params;

  console.log(`Hit at ./api/drawing/get/${sort}/${limit}/${offset}`);
  const currentTime = new Date();
  const currentDay = new Date(currentTime.toDateString());

  Word.findOne({ date: currentDay }).then((word) => {
    if (sort === "likes") {
      Drawing.find({ word_id: word._id })
        .sort({ likes: -1, date: -1 })
        .skip(offset)
        .limit(limit)
        .then((drawings) => {
          res.json(drawings);
        });
    } else {
      Drawing.find({ word_id: word._id })
        .sort({ date: -1 })
        .skip(offset)
        .limit(limit)
        .then((drawings) => {
          res.json(drawings);
        });
    }
  });
});

router.post("/save", (req, res) => {
  const { drawHistory } = req.body;

  console.log(`Hit at ./api/drawing/save`);
  const currentTime = new Date();
  const currentDay = new Date(currentTime.toDateString());

  Word.findOne({ date: currentDay }).then((word) => {
    const newDrawing = new Drawing({
      word_id: word._id,
      date: currentTime,
      drawHistory: drawHistory,
      likes: 0,
    });

    newDrawing.save().then((drawing) => {
      return res.json(drawing);
    });
  });
});

router.post("/like", (req, res) => {
  const { drawing_id, value } = req.body;

  console.log(`Hit at ./api/drawing/like`);

  Drawing.findOneAndUpdate(
    { _id: drawing_id },
    {
      $inc: { likes: value },
    }
  ).then((drawing) => {
    return res.json(drawing);
  });
});
router.delete("/deleteAll", (req, res) => {
  console.log(`Hit at ./api/drawing/deleteAll`);

  Drawing.deleteMany({}).exec();
  return res.json({ success: true });
});

module.exports = router;

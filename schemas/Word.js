const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
});

const Word = mongoose.model("Word", WordSchema);

module.exports = Word;

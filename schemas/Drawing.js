const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DrawingSchema = new Schema({
  word_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  drawHistory: {
    type: Array,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
});

const Drawing = mongoose.model("Drawing", DrawingSchema);

module.exports = Drawing;

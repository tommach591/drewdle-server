const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const uri = `mongodb+srv://drawdle:${process.env.MONGODB_PASSWORD}@drawdle.gtbnw2v.mongodb.net/`;
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}
connect();

const app = express();
app.use(cors());
app.use(express.json());

const Word = require("./routes/api/Word");
const Drawing = require("./routes/api/Drawing");

app.get("/", (req, res) => res.send({ working: "Working..." }));
app.use("/api/word", Word);
app.use("/api/drawing", Drawing);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server started.`);
});

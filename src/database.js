const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config/config");

async function connection() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB is connected");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connection };

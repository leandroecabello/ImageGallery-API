const mongoose = require("mongoose");

async function connection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("DB is connected");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connection;

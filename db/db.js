const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Database Connected");
  } catch (error) {
    console.log("Mongo Connection Fail");
    process.exit(1);
  }
};

module.exports = connectDB;

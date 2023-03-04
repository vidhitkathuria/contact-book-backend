const express = require("express");
const connectDB = require("./db/db");
const cors = require("cors");
const userRoutes = require("./routes/users");
const contactRoutes = require("./routes/contact.js");
require("dotenv").config();

//connect Database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

//connect routes
app.use("/users", userRoutes);
app.use("/contact", contactRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Running Succesfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

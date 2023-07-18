const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter contact name"],
    trim: true,
  },
  number: {
    type: Number,
    required: [true, "please enter contact number"],
    trim: true,
  },

  //   customer_id: {
  //     type: Schema.Types.ObjectId,
  //     required: true,
  //     ref: 'User'
  //   }
  customer_email: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
});

const Contact = new mongoose.model("Contact", contactSchema);

module.exports = { Contact };

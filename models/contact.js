const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter contact name"],
  },
  number: {
    type: Number,
    required: [true, "please enter contact number"],
    unique: true,
  },
  //   customer_id: {
  //     type: Schema.Types.ObjectId,
  //     required: true,
  //     ref: 'User'
  //   }
  customer_email:{
    type: String,
    required: true
  }
});

const Contact = new mongoose.model("Contact", contactSchema);

module.exports = { Contact };

const { Contact } = require("../models/contact");

const createContact = async (req, res) => {
  const { name, number } = req.body;
  console.log(req.body);

  //check if all details are entered
  if (!name || !number) {
    return res.status(400).json({ message: "enter all details" });
  }

  // entered number should be of 10digits only
  if (number.toString().length !== 10) {
    return res.status(400).json({
      message: "number can only be of 10 digits",
    });
  }

  //check if contact already exists
  const contactExists = await Contact.findOne({ number, customer_email: req.user.email });

  if (contactExists) {
    return res.status(401).json({ message: "Contact number already exists" });
  }

  //create contact
  const contact = await Contact.create({
    name,
    number,
    customer_email: req.user.email,
  });
  console.log(contact);

  //check if contact is created
  if (contact) {
    return res.status(200).json({
      name: contact.name,
      number: contact.number,
      message: "Contact info added succesfully",
    });
  } else {
    return res.status(401).json({
      message: "invalid contact details",
    });
  }
};

const getMyContacts = async (req, res) => {
  const email = req.user.email;

  const contacts = await Contact.find({ customer_email: email });

  return res.status(200).json(contacts);
};

const deleteContact = async (req, res) => {
  const id = req.query.id;
  const deletedContact = await Contact.deleteOne({ _id: id });
  return res.sendStatus(204);
};

const updateContact = async (req, res) => {
  const id = req.query.id;

  const contact = await Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { name: req.body.name, number: req.body.number } }
  );

  res.status(200).json(contact);
};

module.exports = { createContact, getMyContacts, deleteContact, updateContact };

const path = require("path");
const multer = require("multer");
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
  const contactExists = await Contact.findOne({
    number,
    customer_email: req.user.email,
  });

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
  }

  if (!contact) {
    return res.status(400).json({
      message: "invalid contact details",
    });
  }
};

//add image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // specify the upload directory
  },
  filename: function (req, file, cb) {
    // generate a unique filename using the original filename and current timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + "-" + uniqueSuffix + ext;
    console.log(filename);
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

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
  const number = req.body.number;
  if (number.toString().length !== 10) {
    return res.status(400).json({
      message: "number can only be of 10 digits",
    });
  }
  const contact = await Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { name: req.body.name, number } }
  );

  res.status(200).json(contact);
};

module.exports = {
  createContact,
  getMyContacts,
  deleteContact,
  updateContact,
  upload,
};

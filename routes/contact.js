const express = require("express");
const {
  createContact,
  getMyContacts,
  deleteContact,
  updateContact,
  upload,
} = require("../controllers/contact");
const router = express.Router();
const { protect } = require("../middleware/auth");
router.post("/create", protect, upload.single("image"), createContact);
router.get("/contacts", protect, getMyContacts);
router.delete("/delete", protect, deleteContact);
router.patch("/update", protect, updateContact);

module.exports = router;

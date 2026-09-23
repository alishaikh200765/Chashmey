const ContactMessage = require("../models/ContactMessage");

// POST /api/contact
exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }
    const saved = await ContactMessage.create({ name, email, phone, message });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

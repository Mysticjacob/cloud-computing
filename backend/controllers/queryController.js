const Query = require("../models/SupportQuery");

exports.submitQuery = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const query = new Query({ name, email, message, status: "pending" });

    await query.save();
    res.status(201).json({ message: "Query submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting query", error });
  }
};

exports.autoReply = async (req, res) => {
  try {
    const { message } = req.body;
    const previousQuery = await Query.findOne({ message });

    if (previousQuery) {
      return res.status(200).json({ reply: "We've handled this before, and here’s the resolution..." });
    }

    res.status(404).json({ reply: "Our team will get back to you shortly." });
  } catch (error) {
    res.status(500).json({ message: "Error fetching auto-reply", error });
  }
};

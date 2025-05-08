const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const { userId, mfaCode } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.mfaCode !== mfaCode) {
      return res.status(403).json({ message: "Invalid MFA code" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "MFA verification failed", error });
  }
};

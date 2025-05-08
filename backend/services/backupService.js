const fs = require("fs");
const path = require("path");

exports.createBackup = async (data, fileName) => {
  try {
    const backupPath = path.join(__dirname, "..", "backup", fileName);
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
    return { success: true, message: "Backup created successfully" };
  } catch (error) {
    throw new Error("Failed to create backup: " + error.message);
  }
};

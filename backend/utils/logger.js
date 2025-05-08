const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "..", "logs", "app.log");

exports.logInfo = (message) => {
  const log = `[INFO] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, log);
};

exports.logError = (message) => {
  const log = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, log);
};

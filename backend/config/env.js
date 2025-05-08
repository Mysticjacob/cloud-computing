require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  databaseURI: process.env.MONGO_URI,
  stripeKey: process.env.STRIPE_SECRET_KEY,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
};

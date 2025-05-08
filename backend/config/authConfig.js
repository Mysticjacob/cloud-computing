module.exports = {
  jwtSecret: process.env.JWT_SECRET || "your-default-secret",
  tokenExpiration: "1h",
  mfaConfig: {
    enabled: true,
    codeLength: 6,
  },
};

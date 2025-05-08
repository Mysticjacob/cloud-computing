exports.validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  exports.validatePassword = (password) => {
    return password.length >= 8;
  };
  
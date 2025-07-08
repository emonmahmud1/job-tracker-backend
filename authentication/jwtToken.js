const jwt = require("jsonwebtoken");

const signToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET
  );
  return token;
};


module.exports = {
  signToken
};

const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authentication = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid!");
  }

  const token = authorization.split(" ")[1];

  try {
    // authenticate using token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decodedToken;
    req.user = await User.findById(userId).select("-password");
    next();
  } catch (err) {
    console.error(err);
    throw new UnauthenticatedError("Authentication Invalid!");
  }
};

module.exports = authentication;

const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid!");
  }

  const token = authorization.split(" ")[1];

  try {
    // authenticate using token
    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = authentication;

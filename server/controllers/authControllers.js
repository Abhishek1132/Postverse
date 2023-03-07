const loginUser = async (req, res) => {
  return res.send("login");
};

const registerUser = async (req, res) => {
  return res.send("register");
};

module.exports = {
  loginUser,
  registerUser,
};

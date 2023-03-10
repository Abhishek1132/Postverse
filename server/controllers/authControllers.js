const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { cloudinaryUpload } = require("../features/cloudinary");
const fs = require("fs");

const User = require("../models/userModel");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all required fields!");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new UnauthenticatedError("Invalid Email or Password!");
  }

  const token = user.generateToken();

  return res.status(StatusCodes.OK).json({
    user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    },
    token,
  });
};

const registerUser = async (req, res) => {
  const {
    name,
    username,
    email,
    occupation,
    gender,
    country,
    password,
    cpassword,
  } = req.body;

  if (!name || !username || !email || !password || !cpassword) {
    throw new BadRequestError("Please provide all the required fields!");
  }

  if (password !== cpassword) {
    throw new BadRequestError("Password and Confirm Password do not match!");
  }

  if (await User.findOne({ username })) {
    throw new BadRequestError("User with this username already exists!");
  }

  if (req.files.length) {
    const { path } = req.files[0];

    var { imageUrl, imageId } = await cloudinaryUpload(
      path,
      "postverse/users",
      username
    );

    fs.unlink(path, (err) => {
      console.log(err);
    });
  }

  console.log(imageId, imageUrl);

  const user = await User.create({
    name,
    username,
    email,
    password,
    occupation,
    gender,
    country,
    profileImage: imageUrl,
  });

  const token = user.generateToken();

  return res.status(StatusCodes.CREATED).json({
    user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
    },
    token,
  });
};

module.exports = {
  loginUser,
  registerUser,
};

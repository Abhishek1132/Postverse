const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: [true, "Name is required!"],
    },
    username: {
      type: String,
      minlength: 5,
      maxlength: 30,
      required: [true, "Username is required!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid Email Address!",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: 6,
    },
    profileImage: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  return jwt.sign({ userid: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const User = model("User", UserSchema);

module.exports = User;

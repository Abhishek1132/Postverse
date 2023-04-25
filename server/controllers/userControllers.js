const { BadRequestError, NotFoundError } = require("../errors");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const searchUsers = async (req, res) => {
  const { q } = req.query;

  let users = await User.find({
    $or: [
      { name: { $regex: q } },
      { email: { $regex: q } },
      { username: { $regex: q } },
    ],
    _id: {
      $ne: req.user._id,
    },
  })
    .sort("username")
    .select("name username email profileImage")
    .limit(6);

  const updatedUsers = users.map((u) => {
    let user = u._doc;
    if (req.user.following.includes(user._id)) {
      user.isFollowing = true;
    } else {
      user.isFollowing = false;
    }

    if (req.user.followers.includes(user._id)) {
      user.isFollower = true;
    } else {
      user.isFollower = false;
    }

    return user;
  });

  res.json(updatedUsers);
};

const followUser = async (req, res) => {
  const { userId } = req.params;

  if (req.user.following.includes(userId)) {
    throw new BadRequestError("Already following this person!");
  }

  const user1 = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        followers: req.user._id,
      },
    },
    {
      new: true,
    }
  );

  if (!user1) {
    throw new NotFoundError("No person found with id:" + userId);
  }

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        following: userId,
      },
    },
    {
      new: true,
    }
  );

  res.json({
    success: true,
  });
};

const unfollowUser = async (req, res) => {
  const { userId } = req.params;

  if (!req.user.following.includes(userId)) {
    throw new BadRequestError("Already not following this person!");
  }

  const user1 = await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        followers: req.user._id,
      },
    },
    {
      new: true,
    }
  );

  if (!user1) {
    throw new NotFoundError("No person found with id:" + userId);
  }

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        following: userId,
      },
    },
    {
      new: true,
    }
  );

  res.json({
    success: true,
  });
};

const getUserProfile = async (req, res) => {
  const { username } = req.params;

  const userProfile = await User.findOne({ username })
    .select("-password -profileImageId -createdAt -updatedAt -__v")
    .populate("followers", "name username email profileImage")
    .populate("following", "name username email profileImage");

  if (!userProfile) {
    throw new NotFoundError("No person found with username: " + username);
  }

  Post.populate(userProfile, {
    path: "posts",
  });

  Post.populate(userProfile, {
    path: "posts.user",
    select: "name username email profileImage",
  });

  Post.populate(userProfile, {
    path: "posts.likes",
    select: "name username email profileImage",
  });

  res.json(userProfile);
};

module.exports = {
  searchUsers,
  getUserProfile,
  followUser,
  unfollowUser,
};

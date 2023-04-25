const { Router } = require("express");
const {
  searchUsers,
  getUserProfile,
  followUser,
  unfollowUser,
} = require("../controllers/userControllers");

const router = Router();

router.get("/search", searchUsers);
router.get("/profile/:username", getUserProfile);
router.patch("/follow/:userId", followUser);
router.patch("/unfollow/:userId", unfollowUser);

module.exports = router;

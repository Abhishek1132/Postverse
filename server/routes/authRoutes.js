const { loginUser, registerUser } = require("../controllers/authControllers");

const { Router } = require("express");
const upload = require("../features/multer");

const router = Router();

router.post("/login", loginUser);
router.post("/register", upload.any("profileImage"), registerUser);

module.exports = router;

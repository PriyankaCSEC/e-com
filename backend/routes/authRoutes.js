const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
// console.log("Received body:", req.body);
router.post("/login", login);
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working" });
});

module.exports = router;

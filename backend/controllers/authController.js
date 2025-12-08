const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    
  try {
    console.log("Received body:", req.body);
    console.log("User model:", User);//User model check
    const { name, email, password } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing)
         return res.status(400).json({ message: "Email already exists" });
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ message: "User registered successfully!", user });
  } catch (err) {
     console.log("REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) return res.status(400).json({ message: "Invalid credentials" });
    //compare password
    const validPass = await bcrypt.compare(password, foundUser.password);
    if (!validPass) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, user: foundUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

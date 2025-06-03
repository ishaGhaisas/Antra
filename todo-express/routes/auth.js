const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];

const SECRET = "my_secret_key";

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'username, password, and role required' });
  }

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = { username, password: hashed, role };
  users.push(user);

  res.status(201).json({ message: "User registered", user: { username, role } });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ username: user.username, role: user.role }, SECRET, { expiresIn: '1h' });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    })
    .status(200)
    .json({
      message: "Login successful",
      user: { username: user.username, role: user.role },
    });
});

router.post('/logout', (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logged out" });
});

module.exports = router;

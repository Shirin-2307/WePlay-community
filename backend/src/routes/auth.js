const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// التسجيل
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, sports = [], city = '' } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already used' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, sports, city });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, sports: user.sports, city: user.city } });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// الدخول
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, sports: user.sports, city: user.city } });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;

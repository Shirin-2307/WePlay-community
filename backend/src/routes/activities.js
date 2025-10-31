const express = require('express');
const Activity = require('../models/Activity'); // ✅ استخدم الموديل الجاهز فقط
const auth = require('../middleware/auth');

const router = express.Router();

// إنشاء نشاط
router.post('/', auth, async (req, res) => {
  try {
    const activity = await Activity.create({
      ...req.body,
      createdBy: req.user.id,
      participants: [req.user.id],
    });
    res.status(201).json(activity);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// جلب أنشطة (مع فلاتر اختيارية)
router.get('/', async (req, res) => {
  const { sport, city, upcoming = 'true' } = req.query;
  const filter = {};
  if (sport) filter.sport = sport;
  if (city) filter.location = new RegExp(city, 'i');
  if (upcoming === 'true') filter.dateTime = { $gte: new Date() };

  const activities = await Activity.find(filter)
    .sort({ dateTime: 1 })
    .limit(50)
    .populate('createdBy', 'name');

  res.json(activities);
});

// الانضمام للنشاط
router.post('/:id/join', auth, async (req, res) => {
  const a = await Activity.findById(req.params.id);
  if (!a) return res.status(404).json({ message: 'Not found' });
  if (a.participants.includes(req.user.id)) return res.json(a);

  if (a.maxPlayers && a.participants.length >= a.maxPlayers) {
    return res.status(400).json({ message: 'Activity full' });
  }

  a.participants.push(req.user.id);
  await a.save();
  res.json(a);
});

module.exports = router;

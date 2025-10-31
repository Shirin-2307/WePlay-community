// src/routes/invitations.js
const express = require('express');
const auth = require('../middleware/auth');
const Activity = require('../models/Activity');
const router = express.Router();

// إرسال دعوة بالـ userId (توسعة لاحقًا برسائل/إشعارات)
router.post('/:activityId/invite/:userId', auth, async (req, res) => {
  const a = await Activity.findById(req.params.activityId);
  if (!a) return res.status(404).json({ message: 'Activity not found' });
  // في النسخة البسيطة نعتبر الدعوة = إضافة للمشاركين
  if (!a.participants.includes(req.params.userId)) {
    a.participants.push(req.params.userId);
    await a.save();
  }
  res.json(a);
});

module.exports = router;
// لاحقًا يمكن إضافة جلب الدعوات المرسلة/المستلمة مع حالة الدعوة (مقبولة/مرفوضة/معلقة)
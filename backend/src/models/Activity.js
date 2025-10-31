const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  sport: { type: String, required: true },
  dateTime: { type: Date, required: true },
  location: { type: String, required: true },
  maxPlayers: { type: Number, default: 10 },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

// ✅ السطران التاليان يمنعان OverwriteModelError عند إعادة التحميل
const Activity = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
module.exports = Activity;

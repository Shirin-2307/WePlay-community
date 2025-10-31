const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 60 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  sports: [{ type: String }],
  city: { type: String }
}, { timestamps: true });

// ✅ امنع إعادة تعريف الموديل
const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  phone: { type: String },
  birthdate: { type: String },
  location: { type: String },
  // Optionally:
  // uid: { type: String, unique: true } // if using Firebase or custom auth
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Username wajib diisi'], unique: true, trim: true },
  email: { type: String, required: [true, 'Email wajib diisi'], unique: true, lowercase: true, trim: true },
  password: { type: String, required: [true, 'Password wajib diisi'], minlength: 6 },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
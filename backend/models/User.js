const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function() { return !this.googleId && !this.appleId; }
  },
  name: {
    type: String,
    required: true
  },
  googleId: String,
  appleId: String,
  isPremium: {
    type: Boolean,
    default: false
  },
  premiumExpiresAt: Date,
  stats: {
    totalTests: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    maxStreak: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    badges: [String],
    lastTestDate: Date
  },
  progress: {
    completedTopics: [String],
    weakTopics: [String],
    masteredTopics: [String]
  }
}, {
  timestamps: true
});

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
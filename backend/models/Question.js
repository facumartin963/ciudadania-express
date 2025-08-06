const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  topic: {
    type: String,
    required: true,
    enum: [
      'Historia de España',
      'Geografía',
      'Constitución Española',
      'Gobierno e Instituciones',
      'Cultura y Sociedad',
      'Literatura y Arte'
    ]
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    text: String,
    isCorrect: Boolean
  }],
  explanation: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['fácil', 'medio', 'difícil'],
    default: 'medio'
  },
  isOfficial: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
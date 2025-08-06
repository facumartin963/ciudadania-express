const express = require('express');
const router = express.Router();

// Ruta temporal para el demo
router.get('/demo-user', (req, res) => {
  res.json({
    success: true,
    user: {
      id: 'demo-user',
      name: 'Usuario Demo',
      email: 'demo@ciudadania.express',
      isPremium: false,
      stats: {
        totalTests: 3,
        correctAnswers: 45,
        currentStreak: 2,
        maxStreak: 5,
        points: 1250,
        badges: ['Primer Test', 'Racha de 3'],
        lastTestDate: new Date()
      },
      progress: {
        completedTopics: ['Historia de España'],
        weakTopics: ['Constitución Española'],
        masteredTopics: []
      }
    }
  });
});

module.exports = router;
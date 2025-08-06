const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Preguntas de ejemplo para el demo
const demoQuestions = [
  {
    id: 1,
    topic: 'Historia de España',
    question: '¿En qué año se promulgó la Constitución Española actual?',
    options: [
      { text: '1975', isCorrect: false },
      { text: '1978', isCorrect: true },
      { text: '1982', isCorrect: false },
      { text: '1986', isCorrect: false }
    ],
    explanation: 'La Constitución Española fue aprobada por las Cortes el 31 de octubre de 1978, ratificada por el pueblo español en referéndum el 6 de diciembre de 1978.',
    difficulty: 'medio',
    isOfficial: true
  },
  {
    id: 2,
    topic: 'Geografía',
    question: '¿Cuál es la montaña más alta de España?',
    options: [
      { text: 'Pico Aneto', isCorrect: false },
      { text: 'Teide', isCorrect: true },
      { text: 'Mulhacén', isCorrect: false },
      { text: 'Pico de Europa', isCorrect: false }
    ],
    explanation: 'El Teide, ubicado en Tenerife (Islas Canarias), es la montaña más alta de España con 3.715 metros de altitud.',
    difficulty: 'fácil',
    isOfficial: true
  },
  {
    id: 3,
    topic: 'Constitución Española',
    question: '¿Cuántos artículos tiene la Constitución Española?',
    options: [
      { text: '169', isCorrect: true },
      { text: '155', isCorrect: false },
      { text: '180', isCorrect: false },
      { text: '200', isCorrect: false }
    ],
    explanation: 'La Constitución Española consta de 169 artículos, distribuidos en un Preámbulo, un Título Preliminar y diez Títulos.',
    difficulty: 'difícil',
    isOfficial: true
  },
  {
    id: 4,
    topic: 'Gobierno e Instituciones',
    question: '¿Quién es el Jefe del Estado en España?',
    options: [
      { text: 'El Presidente del Gobierno', isCorrect: false },
      { text: 'El Rey', isCorrect: true },
      { text: 'El Presidente del Congreso', isCorrect: false },
      { text: 'El Presidente del Senado', isCorrect: false }
    ],
    explanation: 'Según el artículo 56 de la Constitución, el Rey es el Jefe del Estado, símbolo de su unidad y permanencia.',
    difficulty: 'fácil',
    isOfficial: true
  },
  {
    id: 5,
    topic: 'Cultura y Sociedad',
    question: '¿Cuál es el idioma oficial del Estado español?',
    options: [
      { text: 'El castellano', isCorrect: true },
      { text: 'El español y el catalán', isCorrect: false },
      { text: 'Todas las lenguas de España', isCorrect: false },
      { text: 'No hay idioma oficial', isCorrect: false }
    ],
    explanation: 'El artículo 3 de la Constitución establece que el castellano es la lengua española oficial del Estado.',
    difficulty: 'medio',
    isOfficial: true
  }
];

// GET /api/tests/demo - Obtener test de demo
router.get('/demo', async (req, res) => {
  try {
    // Seleccionar 5 preguntas aleatorias para el demo
    const shuffled = demoQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 5);
    
    res.json({
      success: true,
      questions: selectedQuestions,
      totalQuestions: selectedQuestions.length,
      timeLimit: 900 // 15 minutos en segundos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener preguntas del demo',
      error: error.message
    });
  }
});

// POST /api/tests/submit - Enviar resultados del test
router.post('/submit', async (req, res) => {
  try {
    const { answers, timeUsed } = req.body;
    
    // Calcular resultados
    let correctAnswers = 0;
    const results = answers.map((answerIndex, questionIndex) => {
      const question = demoQuestions[questionIndex];
      const isCorrect = question.options[answerIndex]?.isCorrect || false;
      if (isCorrect) correctAnswers++;
      
      return {
        questionId: question.id,
        question: question.question,
        selectedAnswer: question.options[answerIndex]?.text || 'No respondida',
        correctAnswer: question.options.find(opt => opt.isCorrect)?.text,
        isCorrect,
        explanation: question.explanation
      };
    });
    
    const percentage = Math.round((correctAnswers / answers.length) * 100);
    const passed = percentage >= 60; // 60% para aprobar
    
    res.json({
      success: true,
      results: {
        totalQuestions: answers.length,
        correctAnswers,
        percentage,
        passed,
        timeUsed,
        details: results
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al procesar resultados',
      error: error.message
    });
  }
});

module.exports = router;
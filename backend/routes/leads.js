const express = require('express');
const router = express.Router();

// Ruta temporal para el demo
router.post('/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  
  console.log('Nuevo lead recibido:', { name, email, phone, message });
  
  res.json({
    success: true,
    message: 'Solicitud enviada correctamente. Te contactaremos pronto.'
  });
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-domain.vercel.app'] 
    : ['http://localhost:3001', 'http://127.0.0.1:3001'],
  credentials: true
}));
app.use(express.json());

// Conexión a MongoDB (opcional para el demo)
try {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ciudadania_express', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Conectado a MongoDB');
} catch (error) {
  console.log('MongoDB no disponible, continuando sin base de datos');
}

// Importar rutas con manejo de errores
try {
  const authRoutes = require('./routes/auth');
  const testRoutes = require('./routes/tests');
  const leadRoutes = require('./routes/leads');
  
  // Rutas
  app.use('/api/auth', authRoutes);
  app.use('/api/tests', testRoutes);
  app.use('/api/leads', leadRoutes);
} catch (error) {
  console.error('Error cargando rutas:', error.message);
}

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Ciudadania.express API funcionando correctamente',
    timestamp: new Date().toISOString(),
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: '🇪🇸 Ciudadania.express API',
    status: 'Funcionando correctamente',
    endpoints: {
      health: '/api/health',
      demo: '/api/tests/demo',
      submit: '/api/tests/submit'
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: err.message
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🎯 Demo endpoint: http://localhost:${PORT}/api/tests/demo`);
  });
}

// Exportar para Vercel
module.exports = app;
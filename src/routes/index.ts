import { Router } from 'express';
import peliculaRoutes from './pelicula.routes';
import funcionRoutes from './funcion.routes';

const router = Router();

// Rutas principales
router.use('/peliculas', peliculaRoutes);
router.use('/funciones', funcionRoutes);

// Ruta de health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API Cinema Management funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

export default router;

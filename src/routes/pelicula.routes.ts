import { Router } from 'express';
import { PeliculaController } from '../controllers/pelicula.controller';

const router = Router();
const peliculaController = new PeliculaController();

/**
 * @route   GET /api/peliculas
 * @desc    Obtener todas las películas
 * @access  Public
 */
router.get('/', peliculaController.obtenerTodas);

/**
 * @route   GET /api/peliculas/:id
 * @desc    Obtener película por ID
 * @access  Public
 */
router.get('/:id', peliculaController.obtenerPorId);

/**
 * @route   POST /api/peliculas
 * @desc    Crear nueva película
 * @access  Public
 */
router.post('/', peliculaController.crear);

/**
 * @route   PUT /api/peliculas/:id
 * @desc    Actualizar película
 * @access  Public
 */
router.put('/:id', peliculaController.actualizar);

/**
 * @route   DELETE /api/peliculas/:id
 * @desc    Eliminar película (soft delete)
 * @access  Public
 */
router.delete('/:id', peliculaController.eliminar);

/**
 * @route   GET /api/peliculas/genero/:genero
 * @desc    Obtener películas por género
 * @access  Public
 */
router.get('/genero/:genero', peliculaController.obtenerPorGenero);

export default router;

import { Router } from 'express';
import { FuncionController } from '../controllers/funcion.controller';

const router = Router();
const funcionController = new FuncionController();

/**
 * @route   GET /api/funciones
 * @desc    Obtener todas las funciones
 * @access  Public
 */
router.get('/', funcionController.obtenerTodas);

/**
 * @route   GET /api/funciones/proximas
 * @desc    Obtener próximas funciones
 * @access  Public
 */
router.get('/proximas', funcionController.obtenerProximas);

/**
 * @route   GET /api/funciones/fecha
 * @desc    Obtener funciones por fecha
 * @query   fecha (YYYY-MM-DD)
 * @access  Public
 */
router.get('/fecha', funcionController.obtenerPorFecha);

/**
 * @route   GET /api/funciones/:id
 * @desc    Obtener función por ID con detalles
 * @access  Public
 */
router.get('/:id', funcionController.obtenerPorId);

/**
 * @route   GET /api/funciones/pelicula/:peliculaId
 * @desc    Obtener funciones por película
 * @access  Public
 */
router.get('/pelicula/:peliculaId', funcionController.obtenerPorPelicula);

/**
 * @route   POST /api/funciones
 * @desc    Crear nueva función
 * @access  Public
 */
router.post('/', funcionController.crear);

/**
 * @route   PUT /api/funciones/:id
 * @desc    Actualizar función
 * @access  Public
 */
router.put('/:id', funcionController.actualizar);

/**
 * @route   DELETE /api/funciones/:id
 * @desc    Eliminar función (soft delete)
 * @access  Public
 */
router.delete('/:id', funcionController.eliminar);

export default router;

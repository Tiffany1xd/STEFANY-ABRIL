import { Request, Response } from 'express';
import { PeliculaService } from '../services/pelicula.service';
import { CreatePeliculaDTO, UpdatePeliculaDTO } from '../models/pelicula.model';

export class PeliculaController {
  private peliculaService: PeliculaService;

  constructor() {
    this.peliculaService = new PeliculaService();
  }

  obtenerTodas = async (req: Request, res: Response): Promise<void> => {
    try {
      const peliculas = await this.peliculaService.obtenerTodasLasPeliculas();
      res.status(200).json({
        success: true,
        data: peliculas,
        count: peliculas.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las películas',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  obtenerPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const pelicula = await this.peliculaService.obtenerPeliculaPorId(id);
      
      res.status(200).json({
        success: true,
        data: pelicula,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: 'Película no encontrada',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  crear = async (req: Request, res: Response): Promise<void> => {
    try {
      const peliculaData: CreatePeliculaDTO = req.body;
      const nuevaPelicula = await this.peliculaService.crearPelicula(peliculaData);
      
      res.status(201).json({
        success: true,
        message: 'Película creada exitosamente',
        data: nuevaPelicula,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al crear la película',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  actualizar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const peliculaData: UpdatePeliculaDTO = req.body;
      const peliculaActualizada = await this.peliculaService.actualizarPelicula(id, peliculaData);
      
      res.status(200).json({
        success: true,
        message: 'Película actualizada exitosamente',
        data: peliculaActualizada,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al actualizar la película',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  eliminar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.peliculaService.eliminarPelicula(id);
      
      res.status(200).json({
        success: true,
        message: 'Película eliminada exitosamente',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al eliminar la película',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  obtenerPorGenero = async (req: Request, res: Response): Promise<void> => {
    try {
      const { genero } = req.params;
      const peliculas = await this.peliculaService.obtenerPeliculasPorGenero(genero);
      
      res.status(200).json({
        success: true,
        data: peliculas,
        count: peliculas.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener películas por género',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };
}

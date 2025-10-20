import { Request, Response } from 'express';
import { FuncionService } from '../services/funcion.service';
import { CreateFuncionDTO, UpdateFuncionDTO } from '../models/funcion.model';

export class FuncionController {
  private funcionService: FuncionService;

  constructor() {
    this.funcionService = new FuncionService();
  }

  obtenerTodas = async (req: Request, res: Response): Promise<void> => {
    try {
      const funciones = await this.funcionService.obtenerTodasLasFunciones();
      res.status(200).json({
        success: true,
        data: funciones,
        count: funciones.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener las funciones',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  obtenerPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const funcion = await this.funcionService.obtenerFuncionConDetalles(id);
      
      res.status(200).json({
        success: true,
        data: funcion,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: 'Función no encontrada',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  crear = async (req: Request, res: Response): Promise<void> => {
    try {
      const funcionData: CreateFuncionDTO = req.body;
      const nuevaFuncion = await this.funcionService.crearFuncion(funcionData);
      
      res.status(201).json({
        success: true,
        message: 'Función creada exitosamente',
        data: nuevaFuncion,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al crear la función',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  actualizar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const funcionData: UpdateFuncionDTO = req.body;
      const funcionActualizada = await this.funcionService.actualizarFuncion(id, funcionData);
      
      res.status(200).json({
        success: true,
        message: 'Función actualizada exitosamente',
        data: funcionActualizada,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al actualizar la función',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  eliminar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await this.funcionService.eliminarFuncion(id);
      
      res.status(200).json({
        success: true,
        message: 'Función eliminada exitosamente',
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error al eliminar la función',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  obtenerPorPelicula = async (req: Request, res: Response): Promise<void> => {
    try {
      const { peliculaId } = req.params;
      const funciones = await this.funcionService.obtenerFuncionesPorPelicula(peliculaId);
      
      res.status(200).json({
        success: true,
        data: funciones,
        count: funciones.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener funciones por película',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  obtenerProximas = async (req: Request, res: Response): Promise<void> => {
    try {
      const funciones = await this.funcionService.obtenerProximasFunciones();
      
      res.status(200).json({
        success: true,
        data: funciones,
        count: funciones.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener próximas funciones',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };

  obtenerPorFecha = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fecha } = req.query;
      
      if (!fecha) {
        res.status(400).json({
          success: false,
          message: 'La fecha es requerida',
        });
        return;
      }

      const funciones = await this.funcionService.obtenerFuncionesPorFecha(new Date(fecha as string));
      
      res.status(200).json({
        success: true,
        data: funciones,
        count: funciones.length,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener funciones por fecha',
        error: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  };
}

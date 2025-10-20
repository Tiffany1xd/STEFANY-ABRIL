import { Funcion, CreateFuncionDTO, UpdateFuncionDTO, FuncionConDetalles } from '../models/funcion.model';
import { FuncionRepository } from '../repositories/funcion.repository';
import { PeliculaRepository } from '../repositories/pelicula.repository';
import { SalaRepository } from '../repositories/sala.repository';

export class FuncionService {
  private funcionRepository: FuncionRepository;
  private peliculaRepository: PeliculaRepository;
  private salaRepository: SalaRepository;

  constructor() {
    this.funcionRepository = new FuncionRepository();
    this.peliculaRepository = new PeliculaRepository();
    this.salaRepository = new SalaRepository();
  }

  async obtenerTodasLasFunciones(): Promise<Funcion[]> {
    return await this.funcionRepository.findAll();
  }

  async obtenerFuncionPorId(id: string): Promise<Funcion> {
    const funcion = await this.funcionRepository.findById(id);
    
    if (!funcion) {
      throw new Error(`Función con id ${id} no encontrada`);
    }

    return funcion;
  }

  async obtenerFuncionConDetalles(id: string): Promise<FuncionConDetalles> {
    const funcion = await this.funcionRepository.findById(id);
    
    if (!funcion) {
      throw new Error(`Función con id ${id} no encontrada`);
    }

    const pelicula = await this.peliculaRepository.findById(funcion.peliculaId);
    const sala = await this.salaRepository.findById(funcion.salaId);

    const funcionConDetalles: FuncionConDetalles = {
      ...funcion,
      pelicula: pelicula ? {
        id: pelicula.id,
        titulo: pelicula.titulo,
        duracion: pelicula.duracion,
        genero: pelicula.genero,
        clasificacion: pelicula.clasificacion,
      } : undefined,
      sala: sala ? {
        id: sala.id,
        nombre: sala.nombre,
        capacidad: sala.capacidad,
        tipo: sala.tipo,
      } : undefined,
    };

    return funcionConDetalles;
  }

  async crearFuncion(data: CreateFuncionDTO): Promise<Funcion> {
    // Validar que la película existe
    const pelicula = await this.peliculaRepository.findById(data.peliculaId);
    if (!pelicula || !pelicula.activo) {
      throw new Error(`Película con id ${data.peliculaId} no encontrada o inactiva`);
    }

    // Validar que la sala existe
    const sala = await this.salaRepository.findById(data.salaId);
    if (!sala || !sala.activo) {
      throw new Error(`Sala con id ${data.salaId} no encontrada o inactiva`);
    }

    // Validar que la fecha es futura
    const fechaFuncion = new Date(data.fechaHora);
    if (fechaFuncion <= new Date()) {
      throw new Error('La fecha de la función debe ser futura');
    }

    // Validar precio
    if (!data.precio || data.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }

    // Validar asientos disponibles no exceden capacidad de la sala
    if (data.asientosDisponibles > sala.capacidad) {
      throw new Error(`Los asientos disponibles no pueden exceder la capacidad de la sala (${sala.capacidad})`);
    }

    return await this.funcionRepository.create(data);
  }

  async actualizarFuncion(id: string, data: UpdateFuncionDTO): Promise<Funcion> {
    const funcionExistente = await this.funcionRepository.findById(id);
    
    if (!funcionExistente) {
      throw new Error(`Función con id ${id} no encontrada`);
    }

    // Validar película si se está actualizando
    if (data.peliculaId) {
      const pelicula = await this.peliculaRepository.findById(data.peliculaId);
      if (!pelicula || !pelicula.activo) {
        throw new Error(`Película con id ${data.peliculaId} no encontrada o inactiva`);
      }
    }

    // Validar sala si se está actualizando
    if (data.salaId) {
      const sala = await this.salaRepository.findById(data.salaId);
      if (!sala || !sala.activo) {
        throw new Error(`Sala con id ${data.salaId} no encontrada o inactiva`);
      }

      // Validar asientos si se actualiza la sala
      if (data.asientosDisponibles && data.asientosDisponibles > sala.capacidad) {
        throw new Error(`Los asientos disponibles no pueden exceder la capacidad de la sala (${sala.capacidad})`);
      }
    }

    const funcionActualizada = await this.funcionRepository.update(id, data);
    
    if (!funcionActualizada) {
      throw new Error('Error al actualizar la función');
    }

    return funcionActualizada;
  }

  async eliminarFuncion(id: string): Promise<void> {
    const funcionExistente = await this.funcionRepository.findById(id);
    
    if (!funcionExistente) {
      throw new Error(`Función con id ${id} no encontrada`);
    }

    const eliminada = await this.funcionRepository.delete(id);
    
    if (!eliminada) {
      throw new Error('Error al eliminar la función');
    }
  }

  async obtenerFuncionesPorPelicula(peliculaId: string): Promise<Funcion[]> {
    return await this.funcionRepository.findByPeliculaId(peliculaId);
  }

  async obtenerFuncionesPorSala(salaId: string): Promise<Funcion[]> {
    return await this.funcionRepository.findBySalaId(salaId);
  }

  async obtenerFuncionesPorFecha(fecha: Date): Promise<Funcion[]> {
    return await this.funcionRepository.findByFecha(fecha);
  }

  async obtenerProximasFunciones(): Promise<FuncionConDetalles[]> {
    const funciones = await this.funcionRepository.findProximas();
    
    const funcionesConDetalles = await Promise.all(
      funciones.map(async (funcion) => {
        const pelicula = await this.peliculaRepository.findById(funcion.peliculaId);
        const sala = await this.salaRepository.findById(funcion.salaId);

        return {
          ...funcion,
          pelicula: pelicula ? {
            id: pelicula.id,
            titulo: pelicula.titulo,
            duracion: pelicula.duracion,
            genero: pelicula.genero,
            clasificacion: pelicula.clasificacion,
          } : undefined,
          sala: sala ? {
            id: sala.id,
            nombre: sala.nombre,
            capacidad: sala.capacidad,
            tipo: sala.tipo,
          } : undefined,
        };
      })
    );

    return funcionesConDetalles;
  }
}

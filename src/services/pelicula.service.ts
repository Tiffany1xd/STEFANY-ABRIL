import { Pelicula, CreatePeliculaDTO, UpdatePeliculaDTO } from '../models/pelicula.model';
import { PeliculaRepository } from '../repositories/pelicula.repository';

export class PeliculaService {
  private peliculaRepository: PeliculaRepository;

  constructor() {
    this.peliculaRepository = new PeliculaRepository();
  }

  async obtenerTodasLasPeliculas(): Promise<Pelicula[]> {
    return await this.peliculaRepository.findAll();
  }

  async obtenerPeliculaPorId(id: string): Promise<Pelicula> {
    const pelicula = await this.peliculaRepository.findById(id);
    
    if (!pelicula) {
      throw new Error(`Película con id ${id} no encontrada`);
    }

    return pelicula;
  }

  async crearPelicula(data: CreatePeliculaDTO): Promise<Pelicula> {
    // Validaciones
    if (!data.titulo || data.titulo.trim() === '') {
      throw new Error('El título de la película es requerido');
    }

    if (!data.duracion || data.duracion <= 0) {
      throw new Error('La duración debe ser mayor a 0 minutos');
    }

    return await this.peliculaRepository.create(data);
  }

  async actualizarPelicula(id: string, data: UpdatePeliculaDTO): Promise<Pelicula> {
    const peliculaExistente = await this.peliculaRepository.findById(id);
    
    if (!peliculaExistente) {
      throw new Error(`Película con id ${id} no encontrada`);
    }

    const peliculaActualizada = await this.peliculaRepository.update(id, data);
    
    if (!peliculaActualizada) {
      throw new Error('Error al actualizar la película');
    }

    return peliculaActualizada;
  }

  async eliminarPelicula(id: string): Promise<void> {
    const peliculaExistente = await this.peliculaRepository.findById(id);
    
    if (!peliculaExistente) {
      throw new Error(`Película con id ${id} no encontrada`);
    }

    const eliminada = await this.peliculaRepository.delete(id);
    
    if (!eliminada) {
      throw new Error('Error al eliminar la película');
    }
  }

  async obtenerPeliculasPorGenero(genero: string): Promise<Pelicula[]> {
    return await this.peliculaRepository.findByGenero(genero);
  }

  async obtenerPeliculasActivas(): Promise<Pelicula[]> {
    return await this.peliculaRepository.findActivas();
  }
}

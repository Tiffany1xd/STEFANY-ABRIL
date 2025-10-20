import { v4 as uuidv4 } from 'uuid';
import { Pelicula, CreatePeliculaDTO, UpdatePeliculaDTO } from '../models/pelicula.model';
import { IRepository } from './base.repository';

export class PeliculaRepository implements IRepository<Pelicula> {
  private peliculas: Pelicula[] = [];

  async findAll(): Promise<Pelicula[]> {
    return this.peliculas.filter(p => p.activo);
  }

  async findById(id: string): Promise<Pelicula | null> {
    const pelicula = this.peliculas.find(p => p.id === id);
    return pelicula || null;
  }

  async create(data: CreatePeliculaDTO): Promise<Pelicula> {
    const now = new Date();
    const nuevaPelicula: Pelicula = {
      id: uuidv4(),
      ...data,
      activo: true,
      createdAt: now,
      updatedAt: now,
    };
    
    this.peliculas.push(nuevaPelicula);
    return nuevaPelicula;
  }

  async update(id: string, data: UpdatePeliculaDTO): Promise<Pelicula | null> {
    const index = this.peliculas.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }

    const peliculaActualizada: Pelicula = {
      ...this.peliculas[index],
      ...data,
      updatedAt: new Date(),
    };

    this.peliculas[index] = peliculaActualizada;
    return peliculaActualizada;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.peliculas.findIndex(p => p.id === id);
    
    if (index === -1) {
      return false;
    }

    // Soft delete
    this.peliculas[index].activo = false;
    this.peliculas[index].updatedAt = new Date();
    return true;
  }

  // Métodos adicionales específicos
  async findByGenero(genero: string): Promise<Pelicula[]> {
    return this.peliculas.filter(p => p.activo && p.genero === genero);
  }

  async findActivas(): Promise<Pelicula[]> {
    return this.peliculas.filter(p => p.activo);
  }
}

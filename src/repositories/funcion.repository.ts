import { v4 as uuidv4 } from 'uuid';
import { Funcion, CreateFuncionDTO, UpdateFuncionDTO } from '../models/funcion.model';
import { IRepository } from './base.repository';

export class FuncionRepository implements IRepository<Funcion> {
  private funciones: Funcion[] = [];

  async findAll(): Promise<Funcion[]> {
    return this.funciones.filter(f => f.activo);
  }

  async findById(id: string): Promise<Funcion | null> {
    const funcion = this.funciones.find(f => f.id === id);
    return funcion || null;
  }

  async create(data: CreateFuncionDTO): Promise<Funcion> {
    const now = new Date();
    const nuevaFuncion: Funcion = {
      id: uuidv4(),
      ...data,
      activo: true,
      createdAt: now,
      updatedAt: now,
    };
    
    this.funciones.push(nuevaFuncion);
    return nuevaFuncion;
  }

  async update(id: string, data: UpdateFuncionDTO): Promise<Funcion | null> {
    const index = this.funciones.findIndex(f => f.id === id);
    
    if (index === -1) {
      return null;
    }

    const funcionActualizada: Funcion = {
      ...this.funciones[index],
      ...data,
      updatedAt: new Date(),
    };

    this.funciones[index] = funcionActualizada;
    return funcionActualizada;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.funciones.findIndex(f => f.id === id);
    
    if (index === -1) {
      return false;
    }

    // Soft delete
    this.funciones[index].activo = false;
    this.funciones[index].updatedAt = new Date();
    return true;
  }

  // Métodos adicionales específicos
  async findByPeliculaId(peliculaId: string): Promise<Funcion[]> {
    return this.funciones.filter(f => f.activo && f.peliculaId === peliculaId);
  }

  async findBySalaId(salaId: string): Promise<Funcion[]> {
    return this.funciones.filter(f => f.activo && f.salaId === salaId);
  }

  async findByFecha(fecha: Date): Promise<Funcion[]> {
    const fechaBusqueda = new Date(fecha);
    fechaBusqueda.setHours(0, 0, 0, 0);
    
    return this.funciones.filter(f => {
      const fechaFuncion = new Date(f.fechaHora);
      fechaFuncion.setHours(0, 0, 0, 0);
      return f.activo && fechaFuncion.getTime() === fechaBusqueda.getTime();
    });
  }

  async findProximas(): Promise<Funcion[]> {
    const ahora = new Date();
    return this.funciones.filter(f => f.activo && new Date(f.fechaHora) > ahora);
  }
}

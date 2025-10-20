import { v4 as uuidv4 } from 'uuid';
import { Sala } from '../models/sala.model';
import { IRepository } from './base.repository';

export class SalaRepository implements IRepository<Sala> {
  private salas: Sala[] = [];

  constructor() {
    // Inicializar con algunas salas de ejemplo
    this.inicializarSalas();
  }

  private inicializarSalas() {
    const now = new Date();
    this.salas = [
      {
        id: uuidv4(),
        nombre: 'Sala 1',
        capacidad: 100,
        tipo: '2D',
        activo: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        nombre: 'Sala 2',
        capacidad: 80,
        tipo: '3D',
        activo: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: uuidv4(),
        nombre: 'Sala VIP',
        capacidad: 50,
        tipo: 'VIP',
        activo: true,
        createdAt: now,
        updatedAt: now,
      },
    ];
  }

  async findAll(): Promise<Sala[]> {
    return this.salas.filter(s => s.activo);
  }

  async findById(id: string): Promise<Sala | null> {
    const sala = this.salas.find(s => s.id === id);
    return sala || null;
  }

  async create(data: Partial<Sala>): Promise<Sala> {
    const now = new Date();
    const nuevaSala: Sala = {
      id: uuidv4(),
      nombre: data.nombre || '',
      capacidad: data.capacidad || 0,
      tipo: data.tipo || '2D',
      activo: true,
      createdAt: now,
      updatedAt: now,
    };
    
    this.salas.push(nuevaSala);
    return nuevaSala;
  }

  async update(id: string, data: Partial<Sala>): Promise<Sala | null> {
    const index = this.salas.findIndex(s => s.id === id);
    
    if (index === -1) {
      return null;
    }

    const salaActualizada: Sala = {
      ...this.salas[index],
      ...data,
      updatedAt: new Date(),
    };

    this.salas[index] = salaActualizada;
    return salaActualizada;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.salas.findIndex(s => s.id === id);
    
    if (index === -1) {
      return false;
    }

    this.salas[index].activo = false;
    this.salas[index].updatedAt = new Date();
    return true;
  }
}

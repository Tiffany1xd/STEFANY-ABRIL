import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Funcion } from '../tickets/funcion.entity';

@Entity()
export class Sala {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  capacidad: number;

  @Column({ default: '2D' })
  tipo: string;

  @OneToMany(() => Funcion, (f) => f.sala)
  funciones: Funcion[];
}
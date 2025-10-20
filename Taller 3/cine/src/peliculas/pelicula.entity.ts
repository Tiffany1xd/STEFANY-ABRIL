import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Funcion } from '../tickets/funcion.entity';

@Entity()
export class Pelicula {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  genero: string;

  @Column()
  duracion: number; // minutos

  @OneToMany(() => Funcion, (funcion) => funcion.pelicula)
  funciones: Funcion[];
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true, length: 100 })
  correo: string;

  @Column()
  password: string;

  @Column({ nullable: true, length: 15 })
  telefono?: string;

  @Column({ default: 'cliente', length: 20 })
  rol: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.usuario)
  tickets: Ticket[];
}
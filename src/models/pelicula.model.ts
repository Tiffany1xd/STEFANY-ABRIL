export interface Pelicula {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: number; // duración en minutos
  genero: string;
  director: string;
  clasificacion: string; // ejemplo: "PG", "PG-13", "R", etc.
  fechaEstreno: Date;
  imagen?: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePeliculaDTO {
  titulo: string;
  descripcion: string;
  duracion: number;
  genero: string;
  director: string;
  clasificacion: string;
  fechaEstreno: Date;
  imagen?: string;
}

export interface UpdatePeliculaDTO {
  titulo?: string;
  descripcion?: string;
  duracion?: number;
  genero?: string;
  director?: string;
  clasificacion?: string;
  fechaEstreno?: Date;
  imagen?: string;
  activo?: boolean;
}

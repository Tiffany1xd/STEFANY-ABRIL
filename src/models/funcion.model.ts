export interface Funcion {
  id: string;
  peliculaId: string;
  salaId: string;
  fechaHora: Date;
  precio: number;
  asientosDisponibles: number;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFuncionDTO {
  peliculaId: string;
  salaId: string;
  fechaHora: Date;
  precio: number;
  asientosDisponibles: number;
}

export interface UpdateFuncionDTO {
  peliculaId?: string;
  salaId?: string;
  fechaHora?: Date;
  precio?: number;
  asientosDisponibles?: number;
  activo?: boolean;
}

export interface FuncionConDetalles extends Funcion {
  pelicula?: {
    id: string;
    titulo: string;
    duracion: number;
    genero: string;
    clasificacion: string;
  };
  sala?: {
    id: string;
    nombre: string;
    capacidad: number;
    tipo: string;
  };
}

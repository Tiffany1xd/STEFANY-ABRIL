export interface Sala {
  id: string;
  nombre: string;
  capacidad: number;
  tipo: string; // ejemplo: "2D", "3D", "IMAX", "VIP"
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

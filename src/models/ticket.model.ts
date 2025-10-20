export interface Ticket {
  id: string;
  funcionId: string;
  usuarioId: string;
  numeroAsiento: string;
  precioTotal: number;
  estado: 'reservado' | 'pagado' | 'usado' | 'cancelado';
  fechaCompra: Date;
  createdAt: Date;
  updatedAt: Date;
}

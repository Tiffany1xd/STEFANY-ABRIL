import { Controller, Get, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';

@Controller('bus')
export class BusController {
  private buses = [
    { id: 1, placa: 'ABC123', capacidad: 40 },
    { id: 2, placa: 'XYZ987', capacidad: 30 },
  ];

  // GET 1: Obtener todos los buses
  @Get()
  getAll() {
    return this.buses;
  }

  // GET 2: Buscar bus por ID (uso Pipe como dijo el profe)
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) { // ParseIntPipe convierte el id a número
    const bus = this.buses.find(b => b.id === id); // Buscar bus por id con find, usando b como variable abreviada y === para comparación estricta
    return bus ?? { message: `No se encontró bus con id ${id}` };
  }

  // PATCH 1: Actualizar la capacidad de un bus
  @Patch(':id/capacidad') 
  updateCapacidad(
    @Param('id', ParseIntPipe) id: number,
    @Body('capacidad') capacidad: number, // @Body('capacidad') extrae la propiedad 'capacidad' del cuerpo de la solicitud
  ) {
    const bus = this.buses.find(b => b.id === id);
    if (bus) { // Se hace uso del condicional if para verificar si el bus existe
      bus.capacidad = capacidad; 
      return { message: `Capacidad actualizada`, bus };
    }
    return { message: `Bus con id ${id} no encontrado` };
  }

  // PATCH 2: Actualizar la placa del bus
  @Patch(':id/placa')
  updatePlaca(
    @Param('id', ParseIntPipe) id: number,
    @Body('placa') placa: string,
  ) {
    const bus = this.buses.find(b => b.id === id);
    if (bus) {
      bus.placa = placa;
      return { message: `Placa actualizada`, bus };
    }
    return { message: `Bus con id ${id} no encontrado` };
  }
}

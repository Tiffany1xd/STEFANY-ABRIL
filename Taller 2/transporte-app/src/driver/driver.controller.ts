import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common'; // Aquí se importan los decoradores y Pipe necesarios

@Controller('driver')
export class DriverController {  
  private drivers = [
    { id: 1, nombre: 'Carlos', licencia: 'A1' },
    { id: 2, nombre: 'Juan', licencia: 'B2' },
  ];

  // GET 1: Obtener todos los chóferes/conductores
  @Get()
  getAll() {
    return this.drivers;
  }

  // GET 2: Obtener chófer por ID (se hace uso de Pipe igual que en el caso del bus)
  @Get(':id') 
  getById(@Param('id', ParseIntPipe) id: number) { 
    const driver = this.drivers.find(d => d.id === id);
    return driver ?? { message: `No se encontró chófer con id ${id}` }; 
  }

  // POST 1: Crear un nuevo chófer (aquí utilicé POST en vez de PATCH porque estamos creando uno nuevo)
  @Post()
  create(@Body() driver: any) { // El decorador @Body() permite recibir el cuerpo de la solicitud
    this.drivers.push(driver); 
    return { message: 'Chófer creado', driver };
  }

  // POST 2: Registrar varios chóferes/conductores a la vez (aquí también usé POST porque estamos creando)
  @Post('bulk') // Se usa bulk para indicar que es una operación masiva
  createMany(@Body() nuevos: any[]) { // Con createMany se pueden registrar varios chóferes a la vez
    this.drivers.push(...nuevos); 
    return { message: 'Chóferes creados', nuevos };
  }
}
import { Module } from '@nestjs/common';
import { BusController } from './bus.controller'; // Importa el controlador del bus

@Module({
  controllers: [BusController], // Registra el controlador en el módulo para que NestJS lo reconozca
})
export class BusModule {}

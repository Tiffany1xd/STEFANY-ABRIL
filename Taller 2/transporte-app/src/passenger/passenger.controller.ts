import {
    Controller,
    Get,
    Post,
    Put,
    Param,
    Patch,
    Body,
    ParseIntPipe,
} from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';

@Controller('passengers')
export class PassengerController {
    private passengers = [
        { id: 1, name: 'Carlos', age: 25, ticketNumber: 'T123' },
        { id: 2, name: 'Ana', age: 30, ticketNumber: 'T456' },
    ];

    // GET all para obtener todos los pasajeros
    @Get()
    findAll() {
        return {
            message: 'Lista de pasajeros',
            data: this.passengers,
        };
    }

    // GET para obtener al pasajero por su id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        const passenger = this.passengers.find((p) => p.id === id);
        if (!passenger) {
            return { message: `No se encontró pasajero con id ${id}`, data: null };
        }
        return { message: 'Pasajero encontrado', data: passenger };
    }

    // POST para crear un pasajero
    @Post()
    create(@Body() dto: CreatePassengerDto) {
        const newPassenger = {
            id: this.passengers.length + 1,
            ...dto,
        };
        this.passengers.push(newPassenger);
        return { message: 'Pasajero creado', data: newPassenger };
    }

    // POST bulk para crear varios pasajeros a la vez
    @Post('bulk')
    createMany(@Body() dto: CreatePassengerDto[]) {
        const nuevos = dto.map((d, i) => ({
            id: this.passengers.length + i + 1,
            ...d,
        }));
        this.passengers.push(...nuevos);
        return { message: 'Pasajeros creados en lote', data: nuevos };
    }

    // PUT update para actualizar todos los datos de un pasajero
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdatePassengerDto,
    ) {
        const index = this.passengers.findIndex((p) => p.id === id);
        if (index === -1) {
            return { message: `No se encontró pasajero con id ${id}`, data: null };
        }
        this.passengers[index] = { ...this.passengers[index], ...dto };
        return { message: 'Pasajero actualizado', data: this.passengers[index] };
    }

    // PUT update para actualizar solo el ticket del pasajero 
    @Put(':id/ticket')
    updateTicket(
        @Param('id', ParseIntPipe) id: number,
        @Body('ticketNumber') ticketNumber: string,
    ) {
        const index = this.passengers.findIndex((p) => p.id === id);
        if (index === -1) {
            return { message: `No se encontró pasajero con id ${id}`, data: null };
        }
        this.passengers[index].ticketNumber = ticketNumber;
        return {
            message: 'Ticket actualizado',
            data: this.passengers[index],
        };
    }

    // PATCH update para actualizar solo la edad
    @Patch(':id/edad')
    updateEdad(
        @Param('id', ParseIntPipe) id: number,
        @Body('edad') edad: number,
    ) {
        const index = this.passengers.findIndex((p) => p.id === id);
        if (index === -1) {
            return { message: `No se encontró pasajero con id ${id}`, data: null };
        }
        this.passengers[index].age = edad;
        return {
            message: 'Edad actualizada',
            data: this.passengers[index],
        };
    }

    // PATCH update para actualizar solo el nombre
    @Patch(':id/nombre')
    updateNombre(
        @Param('id', ParseIntPipe) id: number,
        @Body('nombre') nombre: string,
    ) {
        const index = this.passengers.findIndex((p) => p.id === id);
        if (index === -1) {
            return { message: `No se encontró pasajero con id ${id}`, data: null };
        }
        this.passengers[index].name = nombre;
        return {
            message: 'Nombre actualizado',
            data: this.passengers[index],
        };
    }
}

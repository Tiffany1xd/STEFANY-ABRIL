import { Controller, Get, Post, Param, Body } from '@nestjs/common';

@Controller('routes')
export class RouteController {
    private routes = [
        { id: 1, origen: 'Bogotá', destino: 'Medellín' },
        { id: 2, origen: 'Cali', destino: 'Cartagena' },
    ];

    // GET todas las rutas
    @Get()
    findAll() {
        return this.routes;
    }

    // GET ruta por id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.routes.find(r => r.id === +id);
    }

    // POST crear nueva ruta
    @Post()
    create(@Body() route) {
        const newRoute = {
            id: this.routes.length + 1,
            ...route,
        };
        this.routes.push(newRoute);
        return newRoute;
    }

    // POST bulk para crear varias rutas
    @Post('bulk')
    createMany(@Body() routes: { origen: string; destino: string }[]) {
        const nuevos = routes.map((r, i) => ({
            id: this.routes.length + i + 1,
            ...r,
        }));
        this.routes.push(...nuevos);
        return nuevos;
    }
}

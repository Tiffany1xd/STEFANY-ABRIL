import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeliculasService } from './peliculas.service';
import { PeliculasController } from './peliculas.controller';
import { Pelicula } from './pelicula.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pelicula])],
  controllers: [PeliculasController],
  providers: [PeliculasService],
  exports: [PeliculasService],
})
export class PeliculasModule {}
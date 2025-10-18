import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from './pelicula.entity';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private repo: Repository<Pelicula>,
  ) {}

  create(dto: CreatePeliculaDto) {
    const pelicula = this.repo.create(dto);
    return this.repo.save(pelicula);
  }

  findAll() {
    return this.repo.find({ relations: ['funciones'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['funciones'] });
  }

  async remove(id: string) {
  const pelicula = await this.findOne(id);
  if (!pelicula) {
    throw new Error(`No se encontró la película con id ${id}`);
  }
  return this.repo.remove(pelicula);
}
}
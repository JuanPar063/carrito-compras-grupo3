import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarritoDto } from './create-carrito.dto';

@Injectable()
export class CarritoService {
  constructor(private prisma: PrismaService) {}

  async create(createCarritoDto: CreateCarritoDto) {
    return this.prisma.carrito.create({
      data: createCarritoDto,
      include: {
        items: {
          include: {
            producto: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.carrito.findMany({
      include: {
        items: {
          include: {
            producto: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.carrito.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            producto: true,
          },
        },
      },
    });
  }
}
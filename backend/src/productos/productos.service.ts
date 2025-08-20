import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductosService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.producto.findMany({

            where: { activo: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        return this.prisma.producto.findUnique({
            where: { id },
        });
    }

    async findByCategoria(categoria: string) {
        return this.prisma.producto.findMany({
            where: {
                categoria: categoria,
                activo: true
            },
            orderBy: { nombre: 'asc' },
        });
    }

    // Método para traer prodcutos de la BD
    async seedProductos() {
        return this.prisma.producto.findMany({
        where: { activo: true },
        orderBy: { createdAt: 'desc' },
    });
    }
}
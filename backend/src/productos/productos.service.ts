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

    // Método para crear productos de ejemplo
    async seedProductos() {
        const productosEjemplo = [
            {
                nombre: 'iPhone 14 Pro',
                descripcion: 'Smartphone Apple con cámara profesional',
                precio: 999.99,
                stock: 50,
                categoria: 'Electrónicos',
                imagen: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
            },
            {
                nombre: 'MacBook Air M2',
                descripcion: 'Laptop ultradelgada con chip M2',
                precio: 1199.99,
                stock: 25,
                categoria: 'Electrónicos',
                imagen: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400'
            },
            {
                nombre: 'Nike Air Max',
                descripcion: 'Zapatillas deportivas cómodas',
                precio: 129.99,
                stock: 100,
                categoria: 'Ropa',
                imagen: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
            },
            {
                nombre: 'Camiseta Básica',
                descripcion: 'Camiseta 100% algodón',
                precio: 19.99,
                stock: 200,
                categoria: 'Ropa',
                imagen: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
            },
            {
                nombre: 'Auriculares Sony',
                descripcion: 'Auriculares inalámbricos con cancelación de ruido',
                precio: 299.99,
                stock: 75,
                categoria: 'Electrónicos',
                imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
            },
            {
                nombre: 'Libro: Clean Code',
                descripcion: 'Manual de programación limpia',
                precio: 45.99,
                stock: 30,
                categoria: 'Libros',
                imagen: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'
            }
        ];

        for (const producto of productosEjemplo) {
            await this.prisma.producto.upsert({
                where: { nombre: producto.nombre },
                update: {},
                create: producto,
            });
        }

        return { message: 'Productos de ejemplo creados' };
    }
}
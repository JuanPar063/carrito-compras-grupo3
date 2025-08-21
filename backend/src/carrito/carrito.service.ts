import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarritoDto } from './create-carrito.dto';
import { AddItemDto } from './add-item.dto';
import { CarritoBuilder } from './carrito.builder';

@Injectable()
export class CarritoService {
    constructor(private prisma: PrismaService) { }

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

    async findByUsuario(usuarioId: string) {
        return this.prisma.carrito.findFirst({
            where: {
                usuarioId,
                estado: 'ACTIVO'
            },
            include: {
                items: {
                    include: {
                        producto: true,
                    },
                },
            },
        });
    }
    
    // Función que construye un carrito de un usuario específico usando Builder
    async buildCarrito(usuarioId: string) {
        const carrito = await this.findByUsuario(usuarioId);
        if(!carrito) return null;

        const builder = new CarritoBuilder();
        carrito.items.forEach((item) =>{
            builder.addProducto(item.producto, item.cantidad);
        });
        return builder.build();
    }

    async getOrCreateCarrito(usuarioId: string) {
        let carrito = await this.findByUsuario(usuarioId);

        if (!carrito) {
            carrito = await this.create({ usuarioId });
        }

        return carrito;
    }

    async addItem(usuarioId: string, addItemDto: AddItemDto) {
        // Verificar que el producto existe y tiene stock
        const producto = await this.prisma.producto.findUnique({
            where: { id: addItemDto.productoId }
        });

        if (!producto) {
            throw new NotFoundException('Producto no encontrado');
        }

        if (producto.stock < addItemDto.cantidad) {
            throw new BadRequestException('Stock insuficiente');
        }

        // Obtener o crear carrito
        const carrito = await this.getOrCreateCarrito(usuarioId);

        // Verificar si el item ya existe en el carrito
        const existingItem = await this.prisma.carritoItem.findUnique({
            where: {
                carritoId_productoId: {
                    carritoId: carrito.id,
                    productoId: addItemDto.productoId
                }
            }
        });

        if (existingItem) {
            // Actualizar cantidad
            await this.prisma.carritoItem.update({
                where: { id: existingItem.id },
                data: {
                    cantidad: existingItem.cantidad + addItemDto.cantidad
                }
            });
        } else {
            // Crear nuevo item
            await this.prisma.carritoItem.create({
                data: {
                    carritoId: carrito.id,
                    productoId: addItemDto.productoId,
                    cantidad: addItemDto.cantidad,
                    precioUnitario: producto.precio
                }
            });
        }

        // Actualizar total del carrito
        await this.updateCarritoTotal(carrito.id);

        // Retornar carrito actualizado
        return this.findByUsuario(usuarioId);
    }

    async removeItem(usuarioId: string, productoId: string) {
        const carrito = await this.findByUsuario(usuarioId);

        if (!carrito) {
            throw new NotFoundException('Carrito no encontrado');
        }

        await this.prisma.carritoItem.deleteMany({
            where: {
                carritoId: carrito.id,
                productoId: productoId
            }
        });

        await this.updateCarritoTotal(carrito.id);

        return this.findByUsuario(usuarioId);
    }

    async updateItemQuantity(usuarioId: string, productoId: string, cantidad: number) {
        const carrito = await this.findByUsuario(usuarioId);

        if (!carrito) {
            throw new NotFoundException('Carrito no encontrado');
        }

        if (cantidad <= 0) {
            return this.removeItem(usuarioId, productoId);
        }

        await this.prisma.carritoItem.updateMany({
            where: {
                carritoId: carrito.id,
                productoId: productoId
            },
            data: { cantidad }
        });

        await this.updateCarritoTotal(carrito.id);

        return this.findByUsuario(usuarioId);
    }

    private async updateCarritoTotal(carritoId: string) {
        const items = await this.prisma.carritoItem.findMany({
            where: { carritoId },
            include: { producto: true }
        });

        const total = items.reduce((sum, item) => {
            return sum + (item.cantidad * item.precioUnitario);
        }, 0);

        await this.prisma.carrito.update({
            where: { id: carritoId },
            data: { total }

        });
    }

    async clearCarrito(usuarioId: string) {
        const carrito = await this.findByUsuario(usuarioId);

        if (!carrito) {
            throw new NotFoundException('Carrito no encontrado');
        }

        await this.prisma.carritoItem.deleteMany({
            where: { carritoId: carrito.id }
        });

        await this.updateCarritoTotal(carrito.id);

        return this.findByUsuario(usuarioId);
    }
}
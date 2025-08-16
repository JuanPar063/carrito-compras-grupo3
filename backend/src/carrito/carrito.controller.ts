import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { AddItemDto } from './add-item.dto';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Get(':usuarioId')
  findByUsuario(@Param('usuarioId') usuarioId: string) {
    return this.carritoService.findByUsuario(usuarioId);
  }

  @Post(':usuarioId/items')
  addItem(
    @Param('usuarioId') usuarioId: string,
    @Body() addItemDto: AddItemDto
  ) {
    return this.carritoService.addItem(usuarioId, addItemDto);
  }

  @Put(':usuarioId/items/:productoId')
  updateItemQuantity(
    @Param('usuarioId') usuarioId: string,
    @Param('productoId') productoId: string,
    @Body() body: { cantidad: number }
  ) {
    return this.carritoService.updateItemQuantity(usuarioId, productoId, body.cantidad);
  }

  @Delete(':usuarioId/items/:productoId')
  removeItem(
    @Param('usuarioId') usuarioId: string,
    @Param('productoId') productoId: string
  ) {
    return this.carritoService.removeItem(usuarioId, productoId);
  }

  @Delete(':usuarioId')
  clearCarrito(@Param('usuarioId') usuarioId: string) {
    return this.carritoService.clearCarrito(usuarioId);
  }
}
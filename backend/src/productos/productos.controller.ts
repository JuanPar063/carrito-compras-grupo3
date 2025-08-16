import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get('categoria/:categoria')
  findByCategoria(@Param('categoria') categoria: string) {
    return this.productosService.findByCategoria(categoria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(id);
  }

  @Post('seed')
  seed() {
    return this.productosService.seedProductos();
  }
}
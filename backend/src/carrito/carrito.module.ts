import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoObserver } from './carrito.observer';

@Module({
  providers: [CarritoService, CarritoObserver],
  exports: [CarritoService],
})
export class CarritoModule {}

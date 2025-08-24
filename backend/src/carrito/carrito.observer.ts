// carrito.observer.ts
import { Injectable, Logger } from '@nestjs/common';
import { carritoObservable } from './carrito.observable';

@Injectable()
export class CarritoObserver {
  private readonly logger = new Logger(CarritoObserver.name);

  constructor() {
    // Me suscribo apenas se inicializa
    carritoObservable.subscribe(this.handleItemAdded.bind(this));
  }

  handleItemAdded(payload: any) {
    //this.logger.log(`🛒 Observer -> Se agregó un item al carrito: ${JSON.stringify(payload)}`);
    console.log('⚡ OBSERVER RECIBIÓ EVENTO:', payload);

  }
}

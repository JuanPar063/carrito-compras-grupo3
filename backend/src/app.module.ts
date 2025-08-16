import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CarritoModule } from './carrito/carrito.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CarritoModule,
    ProductosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
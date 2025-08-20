import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async seedUsuario() {
    const usuarioEjemplo = {
      id: randomUUID(),
      email: 'demo@carrito.com',
      nombre: 'Usuario Demo',
    };

    // Crea el usuario solo si no existe el correo
    return this.prisma.usuario.upsert({
      where: { email: usuarioEjemplo.email },
      update: {},
      create: usuarioEjemplo,
    });
  }
}
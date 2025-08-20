import { Controller, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('seed')
  seed() {
    return this.usuarioService.seedUsuario();
  }
}
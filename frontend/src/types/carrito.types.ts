export interface Producto {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen?: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CarritoItem {
  id: string;
  carritoId: string;
  productoId: string;
  cantidad: number;
  precioUnitario: number;
  producto: Producto;
  createdAt: string;
  updatedAt: string;
}

export interface Carrito {
  id: string;
  usuarioId: string;
  estado: 'ACTIVO' | 'ABANDONADO' | 'CONVERTIDO';
  descuento?: number;
  tipoEnvio?: string;
  total: number;
  items: CarritoItem[];
  createdAt: string;
  updatedAt: string;
}
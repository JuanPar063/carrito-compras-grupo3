// Clase que implementa el patrón Builder para construir un carrito de compras
export class CarritoBuilder {
  private productos: { id: string; nombre: string; precio: number; cantidad: number }[] = [];
  private total = 0;
  private carritoId: string | null = null;

  setCarritoId(id: string): CarritoBuilder {
    this.carritoId = id;
    return this;
  }

  addProducto(producto: { id: string; nombre: string; precio: number }, cantidad: number): CarritoBuilder {
    this.productos.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
    });
    this.total += producto.precio * cantidad;
    return this;
  }

  build() {
    return {
      id: this.carritoId,
      productos: this.productos,
      total: this.total,
    };
  }
}
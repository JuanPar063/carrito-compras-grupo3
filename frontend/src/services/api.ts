import axios from "axios";
import type { Producto, Carrito } from "../types/carrito.types";

/* =========================
   Cliente HTTP
   ========================= */
const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

/* =========================
   ADAPTERS (DTO -> UI)
   ========================= */

// Helpers
const toThousands = (cop?: unknown): number | undefined =>
  typeof cop === "number" ? cop / 1000 : undefined;

const ensureId = (v?: unknown) =>
  (typeof v === "string" && v.length > 0) ? v : Math.random().toString(36).slice(2, 10);

// --- Producto ---
type ProductoDTO = {
  id?: string;
  id_producto?: string;
  productoId?: string;
  nombre?: string;
  name?: string;
  descripcion?: string | null;
  desc?: string | null;
  categoria?: string | null;
  stock?: number;
  stock_disponible?: number;
  imagen?: string | null;
  imagen_url?: string | null;
  precio?: number;      // miles
  precio_cop?: number;  // COP base
};

function adaptProducto(dto: ProductoDTO): Producto {
  const id = ensureId(dto.id ?? dto.id_producto ?? dto.productoId);
  const nombre = dto.nombre ?? dto.name ?? "";
  const descripcion = dto.descripcion ?? dto.desc ?? "";
  const categoria = dto.categoria ?? "General";
  const stock = dto.stock ?? dto.stock_disponible ?? 0;
  const imagen = dto.imagen ?? dto.imagen_url ?? undefined;

  // Si el backend manda precio en COP, lo convierto a miles para que tu UI lo formatee con *1000
  const precio =
    dto.precio ??
    toThousands(dto.precio_cop) ??
    undefined;

  // Ajusta solo si tu tipo Producto tiene/omite "precio"
  const producto: any = { id, nombre, descripcion, categoria, stock, imagen };
  if (typeof precio === "number") producto.precio = precio;

  return producto as Producto;
}

// --- Carrito / Item ---
type CarritoItemDTO = {
  productoId?: string;
  productId?: string;
  id_producto?: string;
  cantidad?: number;
  precioUnitario?: number;          // miles
  precio_unitario?: number;         // miles
  precio_unitario_cop?: number;     // COP base
  precioUnitarioCop?: number;       // COP base
  producto?: ProductoDTO;
};

type CarritoDTO = {
  id?: string;
  usuarioId?: string;
  usuario_id?: string;
  userId?: string;
  user_id?: string;
  items?: CarritoItemDTO[];
  total?: number;     // miles
  total_cop?: number; // COP base
};

function adaptCarritoItem(dto: CarritoItemDTO) {
  const productoId = ensureId(dto.productoId ?? dto.productId ?? dto.id_producto);
  const cantidad = typeof dto.cantidad === "number" ? dto.cantidad : 1;

  // Precio por item en miles (si viene en COP, convierto)
  const precioUnitario =
    dto.precioUnitario ??
    dto.precio_unitario ??
    toThousands(dto.precio_unitario_cop ?? dto.precioUnitarioCop) ??
    // fallback: si viene dentro del producto
    (adaptProducto(dto.producto ?? {}) as any).precio ??
    0;

  return {
    productoId,
    cantidad,
    precioUnitario,
    producto: adaptProducto(dto.producto ?? {}),
  };
}

function adaptCarrito(dto: CarritoDTO): Carrito {
  const id = ensureId(dto.id);
  const usuarioId =
    dto.usuarioId ?? dto.usuario_id ?? dto.userId ?? dto.user_id ?? "";

  const items = (dto.items ?? []).map(adaptCarritoItem);

  // Total en miles (si viene en COP, convierto); si no viene, lo puedo calcular
  const totalMiles =
    dto.total ??
    toThousands(dto.total_cop) ??
    (items.reduce((acc, it) => acc + it.precioUnitario * it.cantidad, 0));

  const carrito: any = { id, usuarioId, items, total: totalMiles };
  return carrito as Carrito;
}

/* =========================
   ENDPOINTS (MISMAS FIRMAS)
   ========================= */

// Productos API
export const productosApi = {
  getAll: async (): Promise<Producto[]> => {
    const { data } = await api.get<ProductoDTO[]>("/productos");
    return Array.isArray(data) ? data.map(adaptProducto) : [];
  },

  getByCategoria: async (categoria: string): Promise<Producto[]> => {
    const { data } = await api.get<ProductoDTO[]>(
      `/productos/categoria/${encodeURIComponent(categoria)}`
    );
    return Array.isArray(data) ? data.map(adaptProducto) : [];
  },

  seedProductos: async () => {
    const { data } = await api.post("/productos/seed");
    return data;
  },
};

// Carrito API
export const carritoApi = {
  getCarrito: async (usuarioId: string): Promise<Carrito | null> => {
    try {
      const { data } = await api.get<CarritoDTO>(`/carrito/${usuarioId}`);
      return adaptCarrito(data);
    } catch (error: any) {
      if (error?.response?.status === 404) return null;
      throw error;
    }
  },

  addItem: async (
    usuarioId: string,
    productoId: string,
    cantidad: number
  ): Promise<Carrito> => {
    const { data } = await api.post<CarritoDTO>(
      `/carrito/${usuarioId}/items`,
      { productoId, cantidad }
    );
    return adaptCarrito(data);
  },

  updateItemQuantity: async (
    usuarioId: string,
    productoId: string,
    cantidad: number
  ): Promise<Carrito> => {
    const { data } = await api.put<CarritoDTO>(
      `/carrito/${usuarioId}/items/${productoId}`,
      { cantidad }
    );
    return adaptCarrito(data);
  },

  removeItem: async (
    usuarioId: string,
    productoId: string
  ): Promise<Carrito> => {
    const { data } = await api.delete<CarritoDTO>(
      `/carrito/${usuarioId}/items/${productoId}`
    );
    return adaptCarrito(data);
  },

  clearCarrito: async (usuarioId: string): Promise<Carrito> => {
    const { data } = await api.delete<CarritoDTO>(`/carrito/${usuarioId}`);
    return adaptCarrito(data);
  },
};

export default api;

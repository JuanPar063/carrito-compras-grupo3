import axios from 'axios';
import { Producto, Carrito } from '../types/carrito.types';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Productos API
export const productosApi = {
  getAll: async (): Promise<Producto[]> => {
    const response = await api.get('/productos');
    return response.data;
  },
  
  getByCategoria: async (categoria: string): Promise<Producto[]> => {
    const response = await api.get(`/productos/categoria/${categoria}`);
    return response.data;
  },
  
  seedProductos: async () => {
    const response = await api.post('/productos/seed');
    return response.data;
  }
};

// Carrito API
export const carritoApi = {
  getCarrito: async (usuarioId: string): Promise<Carrito | null> => {
    try {
      const response = await api.get(`/carrito/${usuarioId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },
  
  addItem: async (usuarioId: string, productoId: string, cantidad: number): Promise<Carrito> => {
    const response = await api.post(`/carrito/${usuarioId}/items`, {
      productoId,
      cantidad
    });
    return response.data;
  },
  
  updateItemQuantity: async (usuarioId: string, productoId: string, cantidad: number): Promise<Carrito> => {
    const response = await api.put(`/carrito/${usuarioId}/items/${productoId}`, {
      cantidad
    });
    return response.data;
  },
  
  removeItem: async (usuarioId: string, productoId: string): Promise<Carrito> => {
    const response = await api.delete(`/carrito/${usuarioId}/items/${productoId}`);
    return response.data;
  },
  
  clearCarrito: async (usuarioId: string): Promise<Carrito> => {
    const response = await api.delete(`/carrito/${usuarioId}`);
    return response.data;
  }
};

export default api;
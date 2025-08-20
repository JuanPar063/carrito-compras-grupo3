import { useState, useEffect } from 'react';
import { carritoApi } from '../services/api';
import { Carrito } from '../types/carrito.types';

const USUARIO_ID = '5fc8e826-8642-4384-b75e-c2db246ba58c'; // ID fijo para demo

export const useCarrito = () => {
  const [carrito, setCarrito] = useState<Carrito | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCarrito = async () => {
    try {
      setLoading(true);
      const carritoData = await carritoApi.getCarrito(USUARIO_ID);
      setCarrito(carritoData);
    } catch (err) {
      setError('Error al cargar el carrito');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCarrito = async (productoId: string, cantidad: number = 1) => {
    try {
      setLoading(true);
      const updatedCarrito = await carritoApi.addItem(USUARIO_ID, productoId, cantidad);
      setCarrito(updatedCarrito);
      return true;
    } catch (err) {
      setError('Error al agregar producto al carrito');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productoId: string, cantidad: number) => {
    try {
      setLoading(true);
      const updatedCarrito = await carritoApi.updateItemQuantity(USUARIO_ID, productoId, cantidad);
      setCarrito(updatedCarrito);
    } catch (err) {
      setError('Error al actualizar cantidad');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productoId: string) => {
    try {
      setLoading(true);
      const updatedCarrito = await carritoApi.removeItem(USUARIO_ID, productoId);
      setCarrito(updatedCarrito);
    } catch (err) {
      setError('Error al eliminar producto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearCarrito = async () => {
    try {
      setLoading(true);
      const updatedCarrito = await carritoApi.clearCarrito(USUARIO_ID);
      setCarrito(updatedCarrito);
    } catch (err) {
      setError('Error al limpiar carrito');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getItemCount = (): number => {
    if (!carrito) return 0;
    return carrito.items.reduce((total, item) => total + item.cantidad, 0);
  };

  useEffect(() => {
    loadCarrito();
  }, []);

  return {
    carrito,
    loading,
    error,
    addToCarrito,
    updateQuantity,
    removeItem,
    clearCarrito,
    getItemCount,
    refreshCarrito: loadCarrito
  };
};
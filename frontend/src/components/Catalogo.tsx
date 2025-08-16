import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { productosApi } from '../services/api';
import { Producto } from '../types/carrito.types';
import { useCarrito } from '../hooks/useCarrito';

export const Catalogo: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriaFilter, setCategoriaFilter] = useState<string>('todas');
  const [categorias, setCategorias] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { addToCarrito, loading: carritoLoading, getItemCount } = useCarrito();

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const data = await productosApi.getAll();
      setProductos(data);
      
      const categoriasUnicas = Array.from(new Set(data.map(p => p.categoria)));
      setCategorias(categoriasUnicas);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedData = async () => {
    try {
      await productosApi.seedProductos();
      await loadProductos();
    } catch (error) {
      console.error('Error al crear datos de ejemplo:', error);
    }
  };

  const handleAddToCart = async (productoId: string) => {
    const success = await addToCarrito(productoId);
    return success;
  };

  const productosFiltrados = productos.filter(producto => {
    const matchesCategoria = categoriaFilter === 'todas' || producto.categoria === categoriaFilter;
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (producto.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategoria && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Cargando productos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Descubre productos increíbles
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
            La mejor selección de productos con envío gratis y los mejores precios
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Barra de búsqueda */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg shadow-sm"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Mensaje para crear productos */}
        {productos.length === 0 && (
          <div className="text-center mb-12 bg-white rounded-2xl p-12 shadow-sm">
            <div className="text-6xl mb-6">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Bienvenido a nuestra tienda!</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Para comenzar, crea algunos productos de ejemplo y explora nuestra increíble colección
            </p>
            <button
              onClick={seedData}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              🚀 Crear Productos de Ejemplo
            </button>
          </div>
        )}

        {productos.length > 0 && (
          <>
            {/* Filtros */}
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Filtrar por categoría:</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setCategoriaFilter('todas')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    categoriaFilter === 'todas'
                      ? 'bg-blue-600 text-white shadow-md transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  Todas ({productos.length})
                </button>
                {categorias.map(categoria => {
                  const count = productos.filter(p => p.categoria === categoria).length;
                  return (
                    <button
                      key={categoria}
                      onClick={() => setCategoriaFilter(categoria)}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                        categoriaFilter === categoria
                          ? 'bg-blue-600 text-white shadow-md transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                      }`}
                    >
                      {categoria} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                Mostrando <span className="font-semibold">{productosFiltrados.length}</span> productos
                {searchTerm && (
                  <span> para "<span className="font-semibold">{searchTerm}</span>"</span>
                )}
              </p>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productosFiltrados.map(producto => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  onAddToCart={handleAddToCart}
                  loading={carritoLoading}
                />
              ))}
            </div>

            {productosFiltrados.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600">
                  Intenta con otros términos de búsqueda o selecciona una categoría diferente
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
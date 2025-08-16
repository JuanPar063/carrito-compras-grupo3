import React, { useState } from 'react';
import { Producto } from '../types/carrito.types';

interface ProductCardProps {
  producto: Producto;
  onAddToCart: (productoId: string) => void;
  loading?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  producto, 
  onAddToCart, 
  loading = false 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    await onAddToCart(producto.id);
    setTimeout(() => setAddingToCart(false), 1000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price * 1000); // Convertir a pesos colombianos
  };

  const getStockStatus = () => {
    if (producto.stock === 0) return { text: 'Agotado', color: 'text-red-600' };
    if (producto.stock < 10) return { text: `Últimas ${producto.stock} unidades`, color: 'text-orange-600' };
    return { text: 'En stock', color: 'text-green-600' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Imagen del producto */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-200 w-full h-full"></div>
          </div>
        )}
        <img
          src={producto.imagen || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'}
          alt={producto.nombre}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Badge de categoría */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            {producto.categoria}
          </span>
        </div>

        {/* Badge de stock bajo */}
        {producto.stock < 10 && producto.stock > 0 && (
          <div className="absolute top-3 right-3">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
              ¡Pocas unidades!
            </span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
          {producto.nombre}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {producto.descripcion || 'Producto de alta calidad disponible en nuestra tienda'}
        </p>

        {/* Precio */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(producto.precio)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(producto.precio * 1.2)}
            </span>
          </div>
          <span className="text-sm text-green-600 font-medium">
            Ahorra {formatPrice(producto.precio * 0.2)}
          </span>
        </div>

        {/* Estado del stock */}
        <div className="mb-4">
          <span className={`text-sm font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>

        {/* Botón de agregar al carrito */}
        <button
          onClick={handleAddToCart}
          disabled={loading || producto.stock === 0 || addingToCart}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 ${
            producto.stock === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : addingToCart
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg'
          }`}
        >
          {addingToCart ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              ¡Agregado!
            </div>
          ) : loading ? (
            'Agregando...'
          ) : producto.stock === 0 ? (
            'Sin Stock'
          ) : (
            'Agregar al Carrito'
          )}
        </button>

        {/* Envío gratis */}
        {producto.precio > 50 && (
          <div className="mt-2 text-center">
            <span className="text-xs text-green-600 font-medium">
              🚚 Envío gratis
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
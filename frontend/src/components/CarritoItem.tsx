import React from 'react';
import { CarritoItem as CarritoItemType } from '../types/carrito.types';

interface CarritoItemProps {
  item: CarritoItemType;
  onUpdateQuantity: (productoId: string, cantidad: number) => void;
  onRemove: (productoId: string) => void;
  loading?: boolean;
}

export const CarritoItemComponent: React.FC<CarritoItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  loading = false
}) => {
  const subtotal = item.cantidad * item.precioUnitario;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price * 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Imagen del producto */}
        <div className="flex-shrink-0">
          <img
            src={item.producto.imagen || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'}
            alt={item.producto.nombre}
            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
          />
        </div>
        
        {/* Información del producto */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-lg mb-1">{item.producto.nombre}</h4>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.producto.descripcion}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="bg-gray-100 px-2 py-1 rounded">{item.producto.categoria}</span>
            <span>Stock disponible: {item.producto.stock}</span>
          </div>
        </div>
        
        {/* Controles de cantidad */}
        <div className="flex-shrink-0">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-sm font-medium text-gray-700">Cantidad:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => onUpdateQuantity(item.productoId, item.cantidad - 1)}
                disabled={loading || item.cantidad <= 1}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="px-4 py-2 font-medium text-center min-w-[3rem]">
                {item.cantidad}
              </span>
              
              <button
                onClick={() => onUpdateQuantity(item.productoId, item.cantidad + 1)}
                disabled={loading || item.cantidad >= item.producto.stock}
                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Precio */}
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">
              {formatPrice(item.precioUnitario)} x {item.cantidad}
            </div>
            <div className="text-xl font-bold text-gray-900 mb-2">
              {formatPrice(subtotal)}
            </div>
            
            <button
              onClick={() => onRemove(item.productoId)}
              disabled={loading}
              className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline disabled:opacity-50"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

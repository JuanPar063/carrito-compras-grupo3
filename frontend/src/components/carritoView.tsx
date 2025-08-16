import React from 'react';
import { CarritoItemComponent } from './CarritoItem';
import { useCarrito } from '../hooks/useCarrito';

export const CarritoView: React.FC = () => {
  const {
    carrito,
    loading,
    error,
    updateQuantity,
    removeItem,
    clearCarrito,
  } = useCarrito();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price * 1000);
  };

  const handleComprar = () => {
    alert('🎉 ¡Gracias por tu compra! En una aplicación real, aquí se procesaría el pago.');
  };

  if (loading && !carrito) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Cargando tu carrito...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center bg-white rounded-2xl p-8 shadow-sm">
          <div className="text-4xl mb-4">❌</div>
          <div className="text-xl font-semibold text-red-600 mb-2">Error al cargar el carrito</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!carrito || carrito.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Carrito de Compras</h1>
          
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              ¡Explora nuestro catálogo y descubre productos increíbles esperándote!
            </p>
            <div className="space-y-4">
              <div className="text-sm text-gray-500">
                • Envío gratis en compras superiores a $50,000
              </div>
              <div className="text-sm text-gray-500">
                • Devoluciones gratuitas por 30 días
              </div>
              <div className="text-sm text-gray-500">
                • Soporte 24/7 para ayudarte
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const itemCount = carrito.items.reduce((sum, item) => sum + item.cantidad, 0);
  const subtotal = carrito.total;
  const envio = subtotal > 50 ? 0 : 5;
  const total = subtotal + envio;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header del carrito */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Mi Carrito</h1>
              <p className="text-gray-600 mt-1">
                {itemCount} {itemCount === 1 ? 'producto' : 'productos'} en tu carrito
              </p>
            </div>
            <button
              onClick={clearCarrito}
              disabled={loading}
              className="text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              🗑️ Vaciar carrito
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {carrito.items.map(item => (
                <CarritoItemComponent
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  loading={loading}
                />
              ))}
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Resumen de Compra</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className={envio === 0 ? 'text-green-600 font-medium' : ''}>
                    {envio === 0 ? 'GRATIS' : formatPrice(envio)}
                  </span>
                </div>
                
                {envio === 0 && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    🎉 ¡Felicidades! Tu pedido califica para envío gratuito
                  </div>
                )}
                
                {carrito.descuento && carrito.descuento > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento aplicado</span>
                    <span>-{formatPrice(carrito.descuento)}</span>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(total - (carrito.descuento || 0))}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleComprar}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Procesando...
                  </div>
                ) : (
                  '🛒 Proceder al Pago'
                )}
              </button>
              
              <div className="mt-4 space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>Pago seguro y protegido</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📦</span>
                  <span>Entrega en 2-5 días hábiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>↩️</span>
                  <span>Devoluciones gratuitas por 30 días</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
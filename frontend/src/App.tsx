import React, { useState, useEffect } from 'react';
import { Catalogo } from './components/Catalogo';
import { CarritoView } from './components/carritoView';
import { useCarrito } from './hooks/useCarrito';
import './App.css';

type View = 'catalogo' | 'carrito';

function App() {
  const [currentView, setCurrentView] = useState<View>('catalogo');
  const { getItemCount } = useCarrito();
  const [showNotification, setShowNotification] = useState(false);
  const [prevItemCount, setPrevItemCount] = useState(0);

  // Mostrar notificación cuando se agregue un producto
  useEffect(() => {
    const currentCount = getItemCount();
    if (currentCount > prevItemCount) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
    setPrevItemCount(currentCount);
  }, [getItemCount(), prevItemCount]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notificación flotante */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 animate-bounce">
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span className="font-medium">¡Producto agregado al carrito!</span>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🛍️</div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mi Tienda
                </h1>
                <p className="text-xs text-gray-500">La mejor experiencia de compra</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('catalogo')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 ${
                  currentView === 'catalogo'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Catálogo
              </button>
              
              <button
                onClick={() => setCurrentView('carrito')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 relative ${
                  currentView === 'carrito'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 004 16h0a1 1 0 001 1h11M9 19a2 2 0 11-4 0 2 2 0 014 0zM20 19a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Mi Carrito
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                    {getItemCount()}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  U
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">Usuario Demo</p>
                  <p className="text-xs text-gray-500">¡Bienvenido de nuevo!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="transition-all duration-300">
        {currentView === 'catalogo' && <Catalogo />}
        {currentView === 'carrito' && <CarritoView />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo y descripción */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">🛍️</div>
                <h3 className="text-2xl font-bold">Mi Tienda</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                La mejor experiencia de compra online con productos de calidad, 
                envío gratuito y atención al cliente excepcional.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 cursor-pointer transition-colors">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 cursor-pointer transition-colors">
                  <span className="text-sm">📷</span>
                </div>
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 cursor-pointer transition-colors">
                  <span className="text-sm">🐦</span>
                </div>
              </div>
            </div>

            {/* Enlaces rápidos */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
              </ul>
            </div>

            {/* Información */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Información</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <span>info@mitienda.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+57 300 123 4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📍</span>
                  <span>Santa Marta, Colombia</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🕒</span>
                  <span>Lun - Vie: 8AM - 6PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2024 Mi Tienda - Proyecto Patrones de Diseño. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <span>🔒</span>
                Compra Segura
              </span>
              <span className="flex items-center gap-1">
                <span>🚚</span>
                Envío Gratis
              </span>
              <span className="flex items-center gap-1">
                <span>↩️</span>
                30 días devolución
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
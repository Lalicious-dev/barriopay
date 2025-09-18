import './App.css';
import { MerchantCard } from './components/MerchantCard';
import { MerchantDetail } from './components/MerchantDetail';
import { MerchantRegisterForm } from './components/MerchantRegisterForm'; // <-- Importa el nuevo componente
import Header from './components/Header';
import { useState, useEffect } from 'react';

export function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const getMerchants = async () => {
      // ... (tu código para cargar merchants)
      try {
        const response = await fetch(`http://localhost:3000/api/getmerchant`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMerchants(data);
      } catch (error) {
        console.error("Error al cargar los merchants:", error);
      }
    };
    getMerchants();
  }, []);

  const handleViewDetails = (name) => {
    // ... (tu código para ver detalles)
    const merchant = merchants.find(m => m.name === name);
    if (merchant) {
      setSelectedMerchant(merchant);
      setCurrentView('detail');
      window.history.pushState({}, '', `/merchant/${name}`);
    }
  }

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedMerchant(null);
    window.history.pushState({}, '', '/');
  }

  // Nuevo manejador para la vista de registro
  const handleGoToRegister = () => {
    setCurrentView('register');
    window.history.pushState({}, '', '/register');
  }

  useEffect(() => {
    const handlePopState = () => {
      // ... (tu código de popstate)
      const path = window.location.pathname;
      if (path === '/') {
        setCurrentView('home');
        setSelectedMerchant(null);
      } else if (path === '/register') {
        setCurrentView('register');
      } else if (path.startsWith('/merchant/')) {
        const name = path.split('/merchant/')[1];
        const merchant = merchants.find(m => m.name === name);
        if (merchant) {
          setSelectedMerchant(merchant);
          setCurrentView('detail');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [merchants]);

  // Si no hay merchants, puedes mostrar un mensaje o un botón para registrar
  if (!merchants.length && currentView === 'home') {
    return (
      <div className='App'>
        <Header />
        <main className='main-content'>
          <p>No hay comercios disponibles. ¡Sé el primero en registrarte!</p>
          <button onClick={handleGoToRegister} className="register-button">
            Registrar mi comercio
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className='App'>
      <Header />
      <main className='main-content'>
        {currentView === 'home' && (
          <>
            {/* Nuevo botón para ir a la vista de registro */}
            <div className="register-container">
              <button onClick={handleGoToRegister} className="register-button">
                Registra tu comercio
              </button>
            </div>
            <div className='merchantCards-container'>
              {merchants.map((merchant) => (
                <MerchantCard
                  key={merchant.id}
                  name={merchant.name}
                  description={merchant.description}
                  phone={merchant.phone}
                  onViewDetails={handleViewDetails}
                >
                  {merchant.name}
                </MerchantCard>
              ))}
            </div>
          </>
        )}

        {currentView === 'detail' && (
          <MerchantDetail
            merchant={selectedMerchant}
            onBack={handleBackToHome}
          />
        )}
        
        {currentView === 'register' && (
          <MerchantRegisterForm onBack={handleBackToHome} />
        )}
      </main>
    </div>
  );
}
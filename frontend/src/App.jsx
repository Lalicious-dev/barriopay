import './App.css';
import { MerchantCard } from './components/MerchantCard';
import { MerchantDetail } from './components/MerchantDetail';
import Header from './components/Header';
import { useState, useEffect } from 'react';

export function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const getMerchants = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getmerchant`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMerchants(data); // <-- Corrección clave aquí
      } catch (error) {
        console.error("Error al cargar los merchants:", error);
      }
    };
    
    getMerchants(); // <-- Llamas a la función
  }, []); // El array de dependencias vacío asegura que se ejecuta solo una vez al montar el componente

  // Resto del código (no necesita cambios)
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/merchant/')) {
      const name = path.split('/merchant/')[1];
      const merchant = merchants.find(m => m.name === name);
      if (merchant) {
        setSelectedMerchant(merchant);
        setCurrentView('detail');
      }
    }
  }, [merchants]); // Agrega `merchants` como dependencia para que se ejecute cuando los datos estén listos.

  const handleViewDetails = (name) => {
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

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/') {
        setCurrentView('home');
        setSelectedMerchant(null);
      } else if (window.location.pathname.startsWith('/merchant/')) {
        const name = window.location.pathname.split('/merchant/')[1];
        const merchant = merchants.find(m => m.name === name);
        if (merchant) {
          setSelectedMerchant(merchant);
          setCurrentView('detail');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [merchants]); // Agrega `merchants` como dependencia.

  if (!merchants.length) return null;

  return (
    <div className='App'>
      <Header />
      <main className='main-content'>
        {currentView === 'home' ? (
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
        ) : (
          <MerchantDetail
            merchant={selectedMerchant}
            onBack={handleBackToHome}
          />
        )}
      </main>
    </div>
  );
}
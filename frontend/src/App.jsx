import './App.css';
import { MerchantCard } from './components/MerchantCard';
import { MerchantDetail } from './components/MerchantDetail';
import Header from './components/Header'; // Importa el Header
import { useState, useEffect } from 'react';




export function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const getMerchants = async () => {
      const merchant = await fetch(`http://localhost:3000/api/getmerchant`);
      const rest = await merchant.json();
      
      return rest;
    }
    
    setMerchants(getMerchants());
  }, []);
  // Leer la ruta actual al cargar la aplicación
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
  }, []);

  const handleViewDetails = (name) => {
    const merchant = merchants.find(m => m.name === name);
    if (merchant) {
      setSelectedMerchant(merchant);
      setCurrentView('detail');
      // Cambiar la URL sin recargar la página
      window.history.pushState({}, '', `/merchant/${name}`);
    }
  }

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedMerchant(null);
    window.history.pushState({}, '', '/');
  }

  // Manejar el botón de retroceso del navegador
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
  }, []);

  if (!merchants.length) return null;

  return (
    <div className='App'>
      {/* Agrega el Header aquí */}
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
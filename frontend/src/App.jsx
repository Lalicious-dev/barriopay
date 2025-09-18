import './App.css';
import { MerchantCard } from './components/MerchantCard';
import { MerchantDetail } from './components/MerchantDetail';
import { MerchantRegisterForm } from './components/MerchantRegisterForm'; // <-- Importa el nuevo componente
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { useState, useEffect } from 'react';

export function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [merchants, setMerchants] = useState([]);

  // 1. Crea una función para cargar los datos.
  const fetchMerchants = async () => {
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

  // 2. Llama a la función al montar el componente.
  useEffect(() => {
    fetchMerchants();
  }, []);

  const handleViewDetails = (name) => {
    // 💡 Esta es la lógica que faltaba.
    const merchant = merchants.find(m => m.name === name);
    if (merchant) {
      setSelectedMerchant(merchant);
      setCurrentView('detail');
      window.history.pushState({}, '', `/merchant/${name}`);
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedMerchant(null);
    window.history.pushState({}, '', '/');
    // 4. Llama a la función de carga para refrescar los datos.
    fetchMerchants();
  };

  const handleGoToRegister = () => {
    setCurrentView('register');
    window.history.pushState({}, '', '/register');
  };
  

  useEffect(() => {
    // ... (código para handlePopState)
  }, [merchants]);

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
            <div className="register-container">
              <p>¿No formas parte de BarrioPay? </p>
              <button onClick={handleGoToRegister} className="register-button">
                Registra tu comercio
              </button>
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
          // 3. Pasa fetchMerchants como una prop llamada onRegisterSuccess.
          <MerchantRegisterForm onBack={handleBackToHome} onRegisterSuccess={fetchMerchants} />
        )}
        
      </main>

         <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
    </div>
  );
}
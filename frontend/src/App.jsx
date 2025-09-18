import './App.css';
import { MerchantCard } from './components/MerchantCard';
import { MerchantDetail } from './components/MerchantDetail';
import { MerchantRegisterForm } from './components/MerchantRegisterForm'; // <-- Importa el nuevo componente
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [merchants, setMerchants] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  

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

  useEffect(() => {
  async function completeTransaction() {
    const params = new URLSearchParams(window.location.search);
    const interact_ref = params.get("interact_ref");
    const transactionId = localStorage.getItem("transactionId");

    if (interact_ref && transactionId) {
      try {
        const result = await fetch("http://localhost:3000/api/complete-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            transactionId,
            interact_ref
          })
        });

        const resultData = await result.json();
        console.log(resultData);

        if(resultData.message == "Transacción Completada") {
          setMostrarForm(true);
        }

        // Limpia storage cuando ya no lo necesites
        localStorage.removeItem("transactionId");
      } catch (error) {
        console.error("Error enviando a backend:", error);
      }
    }
  }

  completeTransaction();
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

        {mostrarForm && (
        <div className="overlay">
          <div className="modal">
            <button className="close-button" onClick={() => setMostrarForm(false)}>X</button>
            <div className='divTransaction'>
              <FontAwesomeIcon icon={faCircleCheck} style={{ fontSize: "4rem", color: "green" }}  />
            </div>
            <h2 className='divTransactionp'>Transacción Completada</h2>
          </div>
        </div>
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
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';

// Recibe la nueva prop onRegisterSuccess.
export function MerchantRegisterForm({ onBack, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    walletURL: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    // 💡 Esta es la parte que faltaba.
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/createmerchant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar el comercio');
      }

      setMessage('¡Comercio registrado con éxito!');
      setFormData({ name: '', description: '', phone: '', walletURL: '' });
      
      if (onRegisterSuccess) {
        await onRegisterSuccess(); 
      }
      
      setTimeout(onBack, 2000); 

    } catch (error) {
      console.error("Error en el registro:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-form-container">
      <button onClick={onBack} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registra tu comercio</h2>
        {message && <div className={`message ${message.includes('Error') ? 'error-message' : 'success-message'}`}>{message}</div>}

        <label>
          Nombre:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        
        <label>
          Descripción:
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
        </label>
        
        <label>
          Teléfono:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        
        <label>
          Wallet URL:
          <input type="url" name="walletURL" value={formData.walletURL} onChange={handleChange} required />
        </label>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Registrando...' : (
            <>
              <FontAwesomeIcon icon={faSave} />
              {" "}Registrar
            </>
          )}
        </button>
      </form>
    </div>
  );
}
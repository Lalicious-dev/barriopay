// components/MerchantDetail.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faHouse } from '@fortawesome/free-solid-svg-icons';

export function MerchantDetail({ merchant, onBack }) {
  if (!merchant) {
    return (
      <div className="merchant-detail">
        <button onClick={onBack} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> 
          <FontAwesomeIcon icon={faHouse} /> 
        </button>
        <div className="error">Comercio no encontrado</div>
      </div>
    );
  }

  return (
    <div className="merchant-detail">
      <button onClick={onBack} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> 
        {"  "}
        <FontAwesomeIcon icon={faHouse} /> 
      </button>
      
      <div className="merchant-detail-card">
        <header className="merchant-detail-header">
          <img
            className="merchant-detail-avatar"
            alt={`Avatar de ${merchant.name}`}
            src={`https://unavatar.io/${merchant.name}`}
          />
          <div className="merchant-detail-info">
            <h1>{merchant.name}</h1>
            <span className="merchant-detail-username">@{merchant.name}</span>
          </div>
        </header>

        <div className="merchant-detail-content">
          <div className="merchant-detail-section">
            <h3>Información de contacto</h3>
            <p>📞 {merchant.phone}</p>
          </div>

          <div className="merchant-detail-section">
            <h3>Descripción</h3>
            <p>{merchant.description}</p>
          </div>

          
          <button className="payment-button">
            Iniciar pago
          </button>
        </div>
      </div>
    </div>
  );
}
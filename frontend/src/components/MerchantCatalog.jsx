// components/MerchantCatalog.jsx
import { MerchantCard } from './MerchantCard';

export function MerchantCatalog({ merchants, loading, onSelectMerchant }) {
  
  const handleMerchantSelect = (userName, action = 'view') => {
    if (onSelectMerchant) {
      onSelectMerchant(userName, action);
    } else {
      // Navegación por defecto
      if (action === 'pay') {
        window.location.href = `/payment/${userName}`;
      } else {
        window.location.href = `/merchant/${userName}`;
      }
    }
  }

  if (loading) {
    return (
      <div className="merchantCards-container">
        {[1, 2, 3, 4].map((item) => (
          <article key={item} className="merchantCard merchantCard-skeleton">
            <div className="merchantCard-content">
              <div className="merchantCard-details">
                <header className="merchantCard-header">
                  <div className="merchantCard-avatar-skeleton"></div>
                  <div className="merchantCard-info">
                    <div className="merchantCard-skeleton-text"></div>
                    <div className="merchantCard-skeleton-text"></div>
                  </div>
                </header>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="merchantCatalog">
      <div className="merchantCatalog-header">
        <h2>Comercios Locales</h2>
        <p>Apoya a negocios locales y paga fácilmente con Open Payments</p>
      </div>
      
      <div className='merchantCards-container'>
        {merchants.map((merchant) => (
          <MerchantCard
            key={merchant.userName}
            userName={merchant.userName}
            phone={merchant.phone}
            acceptsOpenPayment={merchant.acceptsOpenPayment}
            onViewDetails={handleMerchantSelect}
          >
            {merchant.name}
          </MerchantCard>
        ))}
      </div>
    </div>
  );
}
import { Images } from './Images';
export function MerchantCard ({ children, name, description, phone, onViewDetails }) {
  
  const handleViewClick = () => {
    if (onViewDetails) {
      onViewDetails(name);
    } else {
      window.location.href = `/merchant/${name}`;
    }
  }

  return (
    <article className='merchantCard'>
      <div className='merchantCard-content'>
        <div className='merchantCard-details'>
          <header className='merchantCard-header'>
            
            <Images image={name} />
            
            <div className='merchantCard-info'>
              <strong>{children}</strong>
              <span className='merchantCard-infoUserName'>@{name}</span>
              <span className='merchantCard-infoUserName'>{description}</span>
              
              {phone && <div className='merchantCard-phone'>{phone}</div>}
              
            </div>
          </header>
        </div>
        
        <aside className='merchantCard-actions'>
          <button className='merchantCard-button' onClick={handleViewClick}>
            Ver detalles
          </button>
        </aside>
      </div>
    </article>
  )
}
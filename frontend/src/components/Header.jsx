import { Logo } from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        {/* Logo del lado derecho */}
        <div className="header-logo-container">
          <Logo nameImage="BP2.png" />
        </div>
        {/* Contenedor para los iconos del lado izquierdo */}
        <div className="header-icons">
          <a href="/" className="header-link">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </a>
          <a href="/profile" className="header-link">
            <FontAwesomeIcon icon={faUser} />
            <span>Mi Cuenta</span>
          </a>
          <a href="/settings" className="header-link">
            <FontAwesomeIcon icon={faCog} />
            <span>Configuración</span>
          </a>
        </div>

        
      </div>
    </header>
  );
}
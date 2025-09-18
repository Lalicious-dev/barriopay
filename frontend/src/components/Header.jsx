// components/Header.jsx
import { Logo } from './Logo';


export default function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        <Logo nameImage="BP2.png" />
        {/* Puedes agregar más elementos de navegación aquí */}
      </div>
    </header>
  );
}
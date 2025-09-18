import { useState } from 'react';

// Importa la imagen por defecto. Es mejor importarla directamente para que el bundler la maneje.
import defaultImage from '/public/img/default.png'; 

export function Images({ image }) {
  // Estado para la fuente de la imagen. Inicialmente usa la imagen del comerciante.
  const [imgSrc, setImgSrc] = useState(`/img/${image}.png`);

  const handleImageError = () => {
    // Si la imagen actual es la del comerciante, cámbiala a la por defecto.
    if (imgSrc !== defaultImage) {
      setImgSrc(defaultImage);
    }
  };

  return (
    <img
      src={imgSrc}
      alt="imagen del comerciante"
      className="merchant-detail-avatar"
      onError={handleImageError}
    />
  );
}
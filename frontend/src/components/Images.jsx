export function Images({image}) { 
  return (
    <img
      src={`/img/${image}.png`} // <-- Elimina el punto (.) al inicio.
      alt="imagen del comerciante" 
      className="merchant-detail-avatar"
    />
  );
}
export function Logo({ nameImage = "BarrioPay.png" }) {
  return (
    <img
      className='Logobarriopay'
      alt='BarrioPay'
      src={`/img/${nameImage}`} // Cambiado a /img/ desde la carpeta public
    />
  );
}
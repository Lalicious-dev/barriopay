import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";


const FormPago = ({name, setMostrarForm, urlWallet }) => {

    const [data, setData] = useState({
        sendingWalletURL: '',
        amount: '',
        receivingWalletURL: urlWallet ? urlWallet : ""
    });
    const [loading, setLoading] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [transactionId, setTransactionId] = useState(null);

    useEffect(() => {
    if (redirectUrl && transactionId) {
      // Guardamos el transactionId para usarlo después
      localStorage.setItem("transactionId", transactionId);

      // Abrimos el wallet en otra pestaña
      window.open(redirectUrl, "_blank");
    }
  }, [redirectUrl, transactionId]);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const {sendingWalletURL} = data;

        if(sendingWalletURL == "" || data.amount=="" || data.receivingWalletURL==""){
            toast.error('Todos los campos son obligatorios');
            setLoading(false);
            return
        }

        console.log(data);
        
        const request = await fetch('http://localhost:3000/api/incoming-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

         const dataR = await request.json();
         console.log(dataR);
         setTransactionId(dataR.transactionId);
         setRedirectUrl(dataR.redirectUrl);

         setLoading(false);
    }   

    const handleChange = (e) => {
        const { value, name } = e.target;
        
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }


  return (
    <>
      <div class="container">
        <div class="payment-card">
          <button className="close-button" onClick={() => setMostrarForm(false)}>X</button>
          <div class="card-header">
            <h2>Generar Pago</h2>
            <p>Complete la información para procesar su transacción</p>
          </div>

          <form class="payment-form" id="paymentForm" onSubmit={handleSubmit}>
            <h2 className="textNameForm">{name}</h2>
            <div class="form-group">
              <label for="sendingWalletURL">Wallet de Envío</label>
              <input
                type="text"
                id="sendingWalletURL"
                name="sendingWalletURL"
                placeholder="Ingrese su dirección de wallet"
                value={data.sendingWalletUrl}
                onChange={handleChange}
              />
              <span class="input-icon">👛</span>
            </div>

            <div class="form-group">
              <label for="amount">Cantidad</label>
              <input
                type="number"
                id="amount"
                name="amount"
                step="0.000001"
                placeholder="0.00"
                min="0"
                value={data.amount}
                onChange={handleChange}
              />
              <span class="input-icon">💰</span>
            </div>

            {loading && <><Spinner/> <p className="procesandoText">Procesando...</p></> }

            <button type="submit" class="submit-btn">
              <span class="btn-text">Generar Pago</span>
              <span class="btn-icon">→</span>
            </button>
          </form>

          <div class="security-note">
            <p>🔒 Transacciones seguras con tecnología de encriptación</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPago;

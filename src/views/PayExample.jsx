import React, { useState } from 'react';

const PayExample = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  const createPreference = async () => {
    try {
      const response = await fetch('https://api.mercadopago.com/pref', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // También podrías incluir las credenciales aquí si es necesario
        },
        body: JSON.stringify({
          items: [
            {
              title: 'Producto',
              quantity: 1,
              currency_id: 'USD',
              unit_price: 10.0,
            },
          ],
        }),
      });

      const data = await response.json();
      setPreferenceId(data.id);
    } catch (error) {
      console.error('Error al crear la preferencia de pago:', error);
    }
  };

  return (
    <div>
      <button onClick={createPreference}>Crear enlace de pago</button>
      {preferenceId && (
        <div>
          <p>Enlace de pago generado:</p>
          <a href={`https://www.mercadopago.com/checkout/v1/redirect?pref_id=${preferenceId}`} target="_blank" rel="noopener noreferrer">
            Realizar pago
          </a>
        </div>
      )}
    </div>
  );
};

export default PayExample;

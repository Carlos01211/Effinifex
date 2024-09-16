import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactCountryFlag from 'react-country-flag';
import { Card } from "@/components/ui/card";
import { BitcoinCircleIcon } from '@bitcoin-design/bitcoin-icons-react/filled'
import { ArrowRightIcon } from '@bitcoin-design/bitcoin-icons-react/filled'



interface rates {
    gbp: number;
    cop: number;
    eur: number;
    btc:number


}

const Stocks = () => {
    const [rates, setRates] = useState<rates | undefined>(undefined);
    const [error, setError] = useState('');

  useEffect(() => {
    const getExchangeRates = async () => {
      try {
        const response = await axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
        const rates = {
          gbp: response.data.usd.gbp,
          cop: response.data.usd.cop,
          eur: response.data.usd.eur,
          btc: response.data.usd.btc
        };
        setRates(rates);
      } catch (error) {
        console.error('Error al obtener las tasas de cambio:', error);
        setError('No se pudieron obtener las tasas de cambio.');
      }
    };

    getExchangeRates();
  }, []);

  
  const usdFlagStyle = { width: '30px', height: '30px', marginRight: '6px',marginLeft:"5px" ,  borderRadius: '0%'  // Esto hará que la imagen sea completamente redonda
  };

  return (
    <div className='stocks'>
      <Card>
        {rates  ? (
          <ul className='ul'>
            {rates.gbp && (
             <li className='li' style={{ display: 'flex', alignItems: 'center' }}>
                <ReactCountryFlag countryCode="US" svg style={usdFlagStyle} />
                <ArrowRightIcon style={{ height: "20px", width: "35px", color: 'black' }} />
                <ReactCountryFlag countryCode="GB" svg style={usdFlagStyle} />
               <p className='font-medium'> {rates.gbp}</p> 
              
              </li>
            )}
            {rates.cop && (
             <li className='li' style={{ display: 'flex', alignItems: 'center' }}>
                <ReactCountryFlag countryCode="US" svg style={usdFlagStyle} />
                <ArrowRightIcon style={{ height: "20px", width: "35px", color: 'black' }} />

                <ReactCountryFlag countryCode="CO" svg style={usdFlagStyle} />
                <p className='font-medium'>{rates.cop}</p> 
              </li>
            )}
            {rates.eur && (
             <li className='li' style={{ display: 'flex', alignItems: 'center' }}>
                <ReactCountryFlag countryCode="US" svg style={usdFlagStyle} />
                <ArrowRightIcon style={{ height: "20px", width: "35px", color: 'black' }} />

                <ReactCountryFlag countryCode="EU" svg style={usdFlagStyle} />
                <p className='font-medium'>
                {rates.eur}</p> 

                
              </li>
            )}
            {rates.btc && (
             <li className='li' style={{ display: 'flex', alignItems: 'center' }}>
             <ReactCountryFlag countryCode="US" svg style={usdFlagStyle} />
             <ArrowRightIcon style={{ height: "20px", width: "35px", color: 'black' }} />

             <BitcoinCircleIcon style={{ marginLeft: "0px", height: "40px", width: "40px", color: 'orange' }} />
             <p className='font-medium'></p> 
             <p className='font-medium'>{rates.btc}</p> 
         </li>
            )}
          </ul>
        ) : (
          <p>{error || "Loading exchange rates..."}</p>
        )}
      </Card> 
      </div>
  );
};

export default Stocks;
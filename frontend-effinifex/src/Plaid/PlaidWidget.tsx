import React, { useCallback, useEffect } from 'react';
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from 'react-plaid-link';
import axios from 'axios';


interface PlaidWidgetProps {
  token: string;
  openWidget: string;
}

const PlaidWidget: React.FC<PlaidWidgetProps> = ({ token, openWidget }) => {
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      try {
        console.log(public_token)
        const response = await axios.post('http://localhost:8080/api/getAccessToken',   {publicToken: public_token}
        );
        console.log('Success:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [],
  );

  const config: PlaidLinkOptions = {
    onSuccess,
    token,
    
  };

  const { open } = usePlaidLink(config);

  useEffect(() => {
    if (openWidget === "gato") {
      open();
    }
  }, [openWidget, open]);

  return null; // This component doesn’t render anything directly
};

export default PlaidWidget;

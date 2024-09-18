import CryptoJS from 'crypto-js';


const Paynamics = () => {

    const generateSignature = (params : any , merchantKey : string) => {
        // Concatenate parameters into a single string
        const stringToHash = `${params.merchantId}${params.txnId}${params.amount}${params.currency}${merchantKey}`;
      
        // Generate SHA512 hash
        const signature = CryptoJS.SHA512(stringToHash).toString(CryptoJS.enc.Hex);
      
        return signature;
      };
      console.log('eyssssssy')
      const makePaymentRequest = (params : any, merchantKey : string) => {
        // Generate signature
        const signature = generateSignature(params, merchantKey);
      
        // Include signature in parameters
        const requestParams = {
          ...params,
          signature: signature,
        };
      
        // Send request to Paynamics
        // Example fetch request
        fetch('PAYNAMICS_API_URL', {
          method: 'POST',
          body: JSON.stringify(requestParams),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(data => {
            // Handle response from Paynamics
            console.log(data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
      
      // Example usage
      const paymentParams = {
        merchantId: 'YOUR_MERCHANT_ID',
        txnId: 'TRANSACTION_ID',
        amount: 'AMOUNT',
        currency: 'PHP',
        // Add other necessary parameters
      };
      
      const merchantKey = 'YOUR_MERCHANT_KEY';
      makePaymentRequest(paymentParams, merchantKey);
  return (
    <div>Paynamics</div>
  )
}






export default Paynamics
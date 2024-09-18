import { useState } from 'react';
import CryptoJS from 'crypto-js';

// Define interfaces to represent the data structure
interface RPFTransactionPayload {
    merchantId: string;
    request_id: string;
    notification_url: string;
    response_url: string;
    cancel_url: string;
    amount: string;
    pchannel: string;
    collection_method: string;
    currency: string;
    descriptor_note: string;
    pay_reference: string;
    payment_notification_status: string;
    payment_notification_channel: string;
    expiry_limit: string;
    signature: string;
}
interface RPFCustomerInfo {
    fname: string;
    lname: string;
    mname: string;
    email: string;
    phone: string;
    mobile: string;
    dob: string;
    signature: string;

}

interface WORKFLOWTransactionPayload {
    merchant_id: string;
    request_id: string;
    notification_url: string;
    response_url: string;
    cancel_url: string;
    pmethod: string;
    payment_action: string;
    schedule: string;
    deferred_period: string;
    deferred_time: string;
    dp_balance_info: string;
    amount: string;
    pchannel: string;
    collection_method: string;
    currency: string;
    descriptor_note: string;
    pay_reference: string;
    payment_notification_status: string;
    payment_notification_channel: string;
    expiry_limit: string;
    signature: string;
}

interface PaynamicsCredentials {
    RPFNodeMerchantId: string;
    RPFNodeMerchantKey: string;
}

// Utility function to generate signature
const generateSignature = (transaction: RPFTransactionPayload, merchantKey: string) => {
    const signatureString =
        transaction.merchantId +
        transaction.request_id +
        transaction.notification_url +
        transaction.response_url +
        transaction.cancel_url +
        transaction.collection_method +
        transaction.amount +
        transaction.currency +
        transaction.payment_notification_status +
        transaction.payment_notification_channel +
        merchantKey;

    // Use your hashing function to generate the signature, e.g., SHA512
    return sha512(signatureString).toLowerCase();
}

// forSign = merchant_id + request_id + notification_url + response_url + cancel_url + pmethod + payment_action + schedule 
// + collection_method + deferred_period + deferred_time + dp_balance_info + amount + currency + descriptor_note + payment_notification_status 
// + payment_notification_channel + mkey

const generateCustomerSignature = (transaction: RPFCustomerInfo, merchantKey: string) => {
    const signatureString =
        transaction.fname +
        transaction.lname +
        transaction.mname +
        transaction.email +
        transaction.phone +
        transaction.mobile +
        transaction.dob +
        merchantKey;

    // Use your hashing function to generate the signature, e.g., SHA512
    return sha512(signatureString).toLowerCase();
}


const generateWorkflowTransactionSignature = (transaction: WORKFLOWTransactionPayload, merchantKey: string) => {
    const signatureString =
        transaction.merchant_id +
        transaction.request_id +
        transaction.notification_url +
        transaction.response_url +
        transaction.cancel_url +
        transaction.pmethod +
        transaction.payment_action +
        transaction.schedule +
        transaction.collection_method +
        transaction.deferred_period +
        transaction.deferred_time +
        transaction.dp_balance_info +
        transaction.amount +
        transaction.currency +
        transaction.descriptor_note +
        transaction.payment_notification_status +
        transaction.payment_notification_channel +
        merchantKey;

    // Use your hashing function to generate the signature, e.g., SHA512
    return sha512(signatureString).toLowerCase();
}
// SHA512 hashing function (example)
const sha512 = (message: string) => {
    // Implement your SHA512 hashing algorithm here
    // This is just a placeholder
    const signature = CryptoJS.SHA512(message).toString(CryptoJS.enc.Hex);

    return signature;

};

// Your component
export const Transaction = () => {
    const paynamicsCredentials: PaynamicsCredentials = {

        // RPF NODE API ##########################

        RPFNodeMerchantId: '000000301122E9FC2915',
        RPFNodeMerchantKey: '296E93CF5ABB1B53F354F71624416C75',

        // WORKFLOW API ##########################

        // RPFNodeMerchantId: '0000001509231578961B',
        // RPFNodeMerchantKey: '3A3B1D3CC9AD418E32473A6CE1C6FDFC',
    };

    const paynamicsCredentialsWorkFlow: PaynamicsCredentials = {


        // WORKFLOW API ##########################

        RPFNodeMerchantId: '0000001509231578961B',
        RPFNodeMerchantKey: '3A3B1D3CC9AD418E32473A6CE1C6FDFC',
    };
    // State to hold transaction payload
    const [transaction, setTransaction] = useState<RPFTransactionPayload>({
        merchantId: paynamicsCredentials.RPFNodeMerchantId,
        request_id: 'D1XX1SXX',
        // notification_url: 'https://webapp-onlinestore-prod-01-test.azurewebsites.net/CheckOut/NotifURL',
        notification_url: 'https://webhook.site/da2b1dc4-7ad8-4b42-85b5-eeb19e6c144d',
        // response_url: 'https://testonline.stpeter.com.ph/CheckOut/Result?requestid=UFlfTlMtMjAyNDA0MDEwMDAwMDAxNi0zMTgxNQ==',
        // cancel_url: 'https://testonline.stpeter.com.ph/CheckOut/CancelUrl',
        response_url: '',
        cancel_url: '',
        amount: '10600.00',
        pchannel: '',
        collection_method: '',
        currency: 'PHP',
        descriptor_note: '',
        pay_reference: '',
        payment_notification_status: '1',
        payment_notification_channel: '2',
        expiry_limit: '',
        signature: '',
    });

    //working
    //bank_otc , nonbank_otc, 
    //WORKING bdo_cc_ph, gpap_cc_ph,
    // Get the current date and time
    let currentDate = new Date();

    // Add 8 hours to the current date and time
    currentDate.setHours(currentDate.getHours() + 8);

    // Format the date in "yyyy-MM-ddTHH:mm:ss" format
    let formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    console.log(formattedDate); // Output formatted date to console

    const [workflowTransaction, setWorkflowTransaction] = useState<WORKFLOWTransactionPayload>({
        merchant_id: paynamicsCredentialsWorkFlow.RPFNodeMerchantId,
        request_id: 'DDS9053',
        notification_url: 'https://webhook.site/aca4bd69-85f9-4429-8d55-585b2aa79ba9',
        // response_url: 'https://webhook.site/da2b1dc4-7ad8-4b42-85b5-eeb19e6c144d',
        response_url: 'https://testonline.stpeter.com.ph/CheckOut/CancelUrl',
        cancel_url: 'https://testonline.stpeter.com.ph/CheckOut/',
        // pmethod: 'bank_otc',
        // pchannel: 'bdo_ph',
        payment_action: 'url_link',
        schedule: "",
        pmethod: 'nonbank_otc',
        pchannel: 'dp_ph',
        // payment_action: 'sms_invoice ',
        // pmethod: 'wallet',
        // pchannel: 'gc',
        deferred_period: '',
        deferred_time: '',
        dp_balance_info: '',
        // amount: '31100.00',
        amount: '30204.00',

        // pchannel: 'gc',
        collection_method: 'single_pay',
        currency: 'PHP',
        descriptor_note: '',
        pay_reference: '',
        payment_notification_status: '1',
        payment_notification_channel: '3',
        expiry_limit: '',
        signature: '',
    });
    const [customerInfo, setCustomerInfo] = useState<RPFCustomerInfo>({
        fname: "FRANKSXD",
        lname: "GONZALES",
        mname: "FF",
        email: "franksg@stpeter.com.ph",
        // email: "gonzalesjosefrank22@gmail.com",
        phone: "",
        mobile: "+639283988050",
        dob: "",
        signature: '',
    });


    // Paynamics credentials


    // Function to handle form submission
    const handleSubmit = () => {
        // Generate signature
        const generatedSignature = generateSignature(transaction, paynamicsCredentials.RPFNodeMerchantKey);
        const generatedCustomerInfo = generateCustomerSignature(customerInfo, paynamicsCredentialsWorkFlow.RPFNodeMerchantKey);
        const workflowSignature = generateWorkflowTransactionSignature(workflowTransaction, paynamicsCredentialsWorkFlow.RPFNodeMerchantKey)
        // Update transaction payload with generated signature

        setTransaction(prevTransaction => ({
            ...prevTransaction,
            signature: generatedSignature,
        }))
        setCustomerInfo(prevTransaction => ({
            ...prevTransaction,
            signature: generatedCustomerInfo,
        }))

        setWorkflowTransaction(prevTransaction => ({
            ...prevTransaction,
            signature: workflowSignature,
        }))

        // Now, you can proceed with making the request to Paynamics with updated transaction payload
    };
    console.log('trans', transaction)
    console.log('custom info', customerInfo)
    return (
        <div>
            {/* Your JSX code here */}
            {/* {JSON.stringify(transaction)} */}
            {JSON.stringify(workflowTransaction)}
            {JSON.stringify(customerInfo)}
            <button onClick={handleSubmit}>Submit</button>
            <div>
                {/* <a href="https://payin.payserv.net/paygate/transactions/dragonpay/status/aganvDAvDkmknwwDwQaoAgmnDaXagEvo\" target="_blank\" rel="noopener noreferrer\">Click here to proceed payment</a> or follow this link to proceed with your payment: https://payin.payserv.net/paygate/transactions/dragonpay/status/aganvDAvDkmknwwDwQaoAgmnDaXagEvo */}
            </div>
            <a href="https://payin.payserv.net/paygate/transactions/dragonpay/status/aalXwgmwEXvanEluEuvmgXuklDuovXlD"
                target="_blank" rel="noopener noreferrer">
                Click here to proceed payment
            </a> or follow this link to proceed with your payment: https: //payin.payserv.net/paygate/transactions/dragonpay/status/aalXwgmwEXvanEluEuvmgXuklDuovXlD
        </div>
    );
};

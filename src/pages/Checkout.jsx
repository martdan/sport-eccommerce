import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [amount, setAmount] = useState(0); // You can dynamically set this based on cart total

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        // Create payment intent on your backend
        const { data } = await axios.post('https://e1cbb79e-bd0d-4873-b7cb-9ae4cd76a987-00-lxyzoqooe174.sisko.replit.dev/create-payment-intent', { amount });

        const cardElement = elements.getElement(CardElement);

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (stripeError) {
            setError(stripeError.message);
            setProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
            setSuccess(true);
            setProcessing(false);
            setError(null);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                />
                <button type="submit" disabled={!stripe || processing}>
                    {processing ? 'Processing...' : 'Pay'}
                </button>
            </form>
            {error && <p>{error}</p>}
            {success && <p>Payment successful!</p>}
        </div>
    );
};

export default Checkout;

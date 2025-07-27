import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you are ready.');
    }
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1RpVwp4EuLB9MQlOk6pSoyuU', // Replace with the ID of your price
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `${process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL}`,
    });

    if (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      
      <div className="container">
        <h1>Checkout</h1>
        <button 
          role="link" 
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </>
  );
}
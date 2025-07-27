import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    if (session_id) {
      // You can fetch the session details here if needed
      console.log('Successful payment with session ID:', session_id);
    }
  }, [session_id]);

  return (
    <>
      <Head>
        <title>Payment Successful</title>
      </Head>
      <div className="container">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
      </div>
    </>
  );
}
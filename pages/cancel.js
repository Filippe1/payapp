import Head from 'next/head';

export default function CancelPage() {
  return (
    <>
      <Head>
        <title>Payment Canceled</title>
      </Head>
      <div className="container">
        <h1>Payment Canceled</h1>
        <p>Your payment was not completed.</p>
      </div>
    </>
  );
}
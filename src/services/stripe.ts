// Stripe payment service
// TODO: Implement actual Stripe integration when franchise is activated

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'processing' | 'failed';
}

export interface CheckoutSession {
  id: string;
  url: string;
}

/**
 * Creates a payment intent for checkout
 * @param amount - Amount in cents
 * @returns Payment intent object (stubbed for now)
 */
export async function createPaymentIntent(amount: number): Promise<PaymentIntent> {
  // TODO: Replace with actual Stripe API call
  console.log('[STUB] Creating payment intent for amount:', amount);

  return {
    id: `pi_stub_${Date.now()}`,
    amount,
    currency: 'usd',
    status: 'succeeded',
  };
}

/**
 * Creates a checkout session
 * @param items - Array of items to checkout
 * @returns Checkout session with URL (stubbed for now)
 */
export async function createCheckoutSession(items: any[]): Promise<CheckoutSession> {
  // TODO: Replace with actual Stripe checkout session
  console.log('[STUB] Creating checkout session for items:', items);

  return {
    id: `cs_stub_${Date.now()}`,
    url: '/checkout/success', // Redirect to success page for now
  };
}

/**
 * Processes a refund
 * @param paymentIntentId - ID of the payment to refund
 * @returns Success status (stubbed for now)
 */
export async function processRefund(paymentIntentId: string): Promise<boolean> {
  // TODO: Replace with actual Stripe refund
  console.log('[STUB] Processing refund for payment:', paymentIntentId);

  return true;
}

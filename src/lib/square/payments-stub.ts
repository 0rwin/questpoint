/**
 * Square Payments SDK - Stub Implementation
 *
 * This is a stub that simulates Square payment processing.
 * When SQUARE_PAYMENTS_ENABLED is turned on, replace with real Square SDK.
 */

export interface PaymentRequest {
  amount: number;
  cardholderName: string;
  saveCard?: boolean;
  cardNonce?: string; // For saved cards
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  transactionId?: string;
  error?: string;
}

/**
 * Process a payment (stubbed)
 */
export async function processPayment(
  request: PaymentRequest
): Promise<PaymentResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Stub: Always succeed (for demo purposes)
  // Real implementation would call Square Web Payments SDK
  console.log('[STUB] Processing Square payment:', {
    amount: request.amount,
    cardholderName: request.cardholderName,
    saveCard: request.saveCard,
  });

  // Generate mock payment IDs
  const paymentIntentId = `pi_stub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const transactionId = `txn_stub_${Date.now()}`;

  // Simulate occasional failures (10% chance)
  if (Math.random() < 0.1) {
    return {
      success: false,
      error: 'Card declined. Please try a different payment method.',
    };
  }

  return {
    success: true,
    paymentIntentId,
    transactionId,
  };
}

/**
 * Initialize Square Web Payments SDK (stubbed)
 */
export async function initializeSquare(): Promise<void> {
  console.log('[STUB] Square Web Payments SDK initialized');
  // Real implementation would load Square SDK script
  // await loadScript('https://web.squarecdn.com/v1/square.js');
}

/**
 * Refund a payment (stubbed)
 */
export async function refundPayment(
  transactionId: string,
  amount: number
): Promise<{ success: boolean; refundId?: string; error?: string }> {
  console.log('[STUB] Refunding payment:', { transactionId, amount });

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    refundId: `refund_stub_${Date.now()}`,
  };
}

/**
 * Save card to Square Customer Vault (stubbed)
 */
export async function saveCardToVault(
  customerId: string,
  cardNonce: string
): Promise<{ success: boolean; cardId?: string; error?: string }> {
  console.log('[STUB] Saving card to vault for customer:', customerId);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    cardId: `card_stub_${Date.now()}`,
  };
}

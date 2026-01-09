/**
 * Payment Error Handling
 *
 * Spec Section 6.4 - Payment Failure Handling
 * - Declined card errors
 * - Network errors during payment
 * - Failed payment tracking and retry
 */

import { AppError, ErrorHandlers, formatErrorMessage } from './errors';

export type PaymentErrorType =
  | 'card_declined'
  | 'insufficient_funds'
  | 'expired_card'
  | 'invalid_card'
  | 'network_error'
  | 'timeout'
  | 'processing_error'
  | 'authentication_failed'
  | 'unknown';

export interface PaymentError extends AppError {
  type: PaymentErrorType;
  retryable: boolean;
  squareErrorCode?: string;
}

/**
 * Parse Square payment error and convert to user-friendly message
 */
export function parseSquarePaymentError(error: any): PaymentError {
  // Extract error details from Square SDK
  const errorCode = error?.code || error?.error_code || 'UNKNOWN';
  const errorMessage = error?.message || error?.detail || 'Payment failed';

  // Map Square error codes to user-friendly messages
  switch (errorCode) {
    case 'CARD_DECLINED':
    case 'DECLINED':
      return {
        code: 'PAY-DECLINED',
        type: 'card_declined',
        message: errorMessage,
        userMessage: 'Payment declined. Please try a different card.',
        retryable: true,
        squareErrorCode: errorCode,
      };

    case 'INSUFFICIENT_FUNDS':
      return {
        code: 'PAY-DECLINED',
        type: 'insufficient_funds',
        message: errorMessage,
        userMessage: 'Payment declined due to insufficient funds. Please try a different card.',
        retryable: true,
        squareErrorCode: errorCode,
      };

    case 'EXPIRED_CARD':
      return {
        code: 'PAY-DECLINED',
        type: 'expired_card',
        message: errorMessage,
        userMessage: 'Your card has expired. Please use a different card.',
        retryable: true,
        squareErrorCode: errorCode,
      };

    case 'INVALID_CARD':
    case 'INVALID_NUMBER':
    case 'INVALID_EXPIRATION':
    case 'INVALID_CVV':
      return {
        code: 'PAY-INVALID',
        type: 'invalid_card',
        message: errorMessage,
        userMessage: 'Invalid card details. Please check your card information.',
        retryable: true,
        squareErrorCode: errorCode,
      };

    case 'NETWORK_ERROR':
    case 'GATEWAY_TIMEOUT':
      return {
        code: 'PAY-NETWORK',
        type: 'network_error',
        message: errorMessage,
        userMessage: 'Network error during payment. Please check your connection and try again.',
        retryable: true,
        squareErrorCode: errorCode,
      };

    case 'TIMEOUT':
    case 'REQUEST_TIMEOUT':
      return {
        code: 'PAY-TIMEOUT',
        type: 'timeout',
        message: errorMessage,
        userMessage: 'Payment timed out. Please try again.',
        retryable: true,
        squareErrorCode: errorCode,
      };

    case 'AUTHENTICATION_REQUIRED':
    case '3DS_REQUIRED':
      return {
        code: 'PAY-401',
        type: 'authentication_failed',
        message: errorMessage,
        userMessage: 'Payment authentication required. Please complete 3D Secure verification.',
        retryable: true,
        squareErrorCode: errorCode,
      };

    default:
      return {
        code: 'PAY-401',
        type: 'processing_error',
        message: errorMessage,
        userMessage: 'Payment failed. Please try again.',
        retryable: true,
        squareErrorCode: errorCode,
      };
  }
}

/**
 * Failed payment intent for retry/recovery
 */
export interface FailedPaymentIntent {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  cardLast4?: string;
  error: PaymentError;
  attemptCount: number;
  maxAttempts: number;
  createdAt: string;
  lastAttemptAt: string;
}

const FAILED_PAYMENTS_KEY = 'questpoint_failed_payments';
const MAX_RETRY_ATTEMPTS = 3;

/**
 * Save failed payment intent for retry when network recovers
 */
export function saveFailedPayment(
  orderId: string,
  amount: number,
  error: PaymentError,
  cardLast4?: string
): FailedPaymentIntent {
  const intent: FailedPaymentIntent = {
    id: `failed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    orderId,
    amount,
    currency: 'USD',
    cardLast4,
    error,
    attemptCount: 1,
    maxAttempts: MAX_RETRY_ATTEMPTS,
    createdAt: new Date().toISOString(),
    lastAttemptAt: new Date().toISOString(),
  };

  try {
    const existing = getFailedPayments();
    existing.push(intent);
    localStorage.setItem(FAILED_PAYMENTS_KEY, JSON.stringify(existing));
    console.log('[PAYMENT] Saved failed payment intent:', intent.id);
  } catch (error) {
    console.error('[PAYMENT] Failed to save payment intent:', error);
  }

  return intent;
}

/**
 * Get all failed payment intents
 */
export function getFailedPayments(): FailedPaymentIntent[] {
  try {
    const stored = localStorage.getItem(FAILED_PAYMENTS_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('[PAYMENT] Failed to read payment intents:', error);
    return [];
  }
}

/**
 * Retry a failed payment
 */
export async function retryFailedPayment(
  intentId: string,
  retryFn: () => Promise<boolean>
): Promise<{ success: boolean; error?: PaymentError }> {
  const intents = getFailedPayments();
  const intent = intents.find((i) => i.id === intentId);

  if (!intent) {
    return {
      success: false,
      error: {
        code: 'PAY-401',
        type: 'unknown',
        message: 'Payment intent not found',
        userMessage: 'Payment record not found. Please try again.',
        retryable: false,
      },
    };
  }

  if (intent.attemptCount >= intent.maxAttempts) {
    return {
      success: false,
      error: {
        code: 'PAY-401',
        type: 'processing_error',
        message: 'Max retry attempts reached',
        userMessage: 'Maximum retry attempts reached. No charge was made. Please try again or contact support.',
        retryable: false,
      },
    };
  }

  try {
    console.log('[PAYMENT] Retrying failed payment:', intentId);
    const success = await retryFn();

    if (success) {
      // Remove from failed payments
      removeFailedPayment(intentId);
      return { success: true };
    } else {
      // Increment attempt count
      intent.attemptCount++;
      intent.lastAttemptAt = new Date().toISOString();
      updateFailedPayment(intent);

      return {
        success: false,
        error: intent.error,
      };
    }
  } catch (error: any) {
    // Update attempt count
    intent.attemptCount++;
    intent.lastAttemptAt = new Date().toISOString();
    updateFailedPayment(intent);

    const paymentError = parseSquarePaymentError(error);
    return {
      success: false,
      error: paymentError,
    };
  }
}

/**
 * Remove failed payment intent
 */
export function removeFailedPayment(intentId: string): void {
  try {
    const intents = getFailedPayments();
    const filtered = intents.filter((i) => i.id !== intentId);
    localStorage.setItem(FAILED_PAYMENTS_KEY, JSON.stringify(filtered));
    console.log('[PAYMENT] Removed failed payment intent:', intentId);
  } catch (error) {
    console.error('[PAYMENT] Failed to remove payment intent:', error);
  }
}

/**
 * Update failed payment intent
 */
function updateFailedPayment(intent: FailedPaymentIntent): void {
  try {
    const intents = getFailedPayments();
    const index = intents.findIndex((i) => i.id === intent.id);
    if (index !== -1) {
      intents[index] = intent;
      localStorage.setItem(FAILED_PAYMENTS_KEY, JSON.stringify(intents));
    }
  } catch (error) {
    console.error('[PAYMENT] Failed to update payment intent:', error);
  }
}

/**
 * Clear all failed payment intents (e.g., after successful checkout)
 */
export function clearFailedPayments(): void {
  try {
    localStorage.removeItem(FAILED_PAYMENTS_KEY);
    console.log('[PAYMENT] Cleared all failed payment intents');
  } catch (error) {
    console.error('[PAYMENT] Failed to clear payment intents:', error);
  }
}

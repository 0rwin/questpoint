/**
 * Error Handling System
 *
 * Spec Section 6.1 - Error Messages
 * Format: "User-friendly message. (Error: CODE)"
 *
 * Error codes are prefixed by category:
 * - AUTH-xxx: Authentication errors
 * - PAY-xxx: Payment processing errors
 * - DB-xxx: Database/Supabase errors
 * - NET-xxx: Network errors
 * - VAL-xxx: Validation errors
 */

export type ErrorCode =
  // Authentication errors
  | 'AUTH-401'      // Unauthorized
  | 'AUTH-403'      // Forbidden
  | 'AUTH-EXPIRED'  // Session expired
  | 'AUTH-INVALID'  // Invalid credentials
  // Payment errors
  | 'PAY-DECLINED'  // Card declined
  | 'PAY-401'       // Payment authentication failed
  | 'PAY-TIMEOUT'   // Payment timeout
  | 'PAY-NETWORK'   // Network error during payment
  | 'PAY-INVALID'   // Invalid payment details
  // Database errors
  | 'DB-CONNECTION' // Cannot connect to database
  | 'DB-QUERY'      // Query failed
  | 'DB-TIMEOUT'    // Database timeout
  // Network errors
  | 'NET-OFFLINE'   // User is offline
  | 'NET-TIMEOUT'   // Request timeout
  | 'NET-SERVER'    // Server error (5xx)
  // Validation errors
  | 'VAL-REQUIRED'  // Required field missing
  | 'VAL-FORMAT'    // Invalid format
  | 'VAL-RANGE'     // Value out of range
  // General errors
  | 'UNKNOWN';      // Unknown error

export interface AppError {
  code: ErrorCode;
  message: string;
  userMessage: string;
  details?: Record<string, any>;
}

/**
 * Create a user-friendly error message with error code
 * Format: "User message. (Error: CODE)"
 */
export function formatErrorMessage(userMessage: string, code: ErrorCode): string {
  return `${userMessage} (Error: ${code})`;
}

/**
 * Create an AppError from various error types
 */
export function createAppError(
  error: unknown,
  defaultCode: ErrorCode = 'UNKNOWN',
  defaultMessage: string = 'An unexpected error occurred. Please try again.'
): AppError {
  // If it's already an AppError
  if (isAppError(error)) {
    return error;
  }

  // Standard Error
  if (error instanceof Error) {
    return {
      code: defaultCode,
      message: error.message,
      userMessage: defaultMessage,
      details: { originalError: error.name },
    };
  }

  // String error
  if (typeof error === 'string') {
    return {
      code: defaultCode,
      message: error,
      userMessage: defaultMessage,
    };
  }

  // Unknown error type
  return {
    code: 'UNKNOWN',
    message: 'Unknown error',
    userMessage: defaultMessage,
    details: { error },
  };
}

/**
 * Check if an error is an AppError
 */
export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'userMessage' in error
  );
}

/**
 * Common error creators for different scenarios
 */
export const ErrorHandlers = {
  // Authentication errors
  auth: {
    unauthorized: (): AppError => ({
      code: 'AUTH-401',
      message: 'User is not authenticated',
      userMessage: 'Please sign in to continue.',
    }),
    sessionExpired: (): AppError => ({
      code: 'AUTH-EXPIRED',
      message: 'Session has expired',
      userMessage: 'Your session has expired. Please sign in again.',
    }),
    invalidCredentials: (): AppError => ({
      code: 'AUTH-INVALID',
      message: 'Invalid email or password',
      userMessage: 'Invalid email or password. Please try again.',
    }),
  },

  // Payment errors
  payment: {
    declined: (reason?: string): AppError => ({
      code: 'PAY-DECLINED',
      message: `Payment declined: ${reason || 'unknown'}`,
      userMessage: 'Payment declined. Please try a different card.',
      details: { reason },
    }),
    timeout: (): AppError => ({
      code: 'PAY-TIMEOUT',
      message: 'Payment request timed out',
      userMessage: 'Payment timed out. Please try again.',
    }),
    networkError: (): AppError => ({
      code: 'PAY-NETWORK',
      message: 'Network error during payment',
      userMessage: 'Network error during payment. Please check your connection and try again.',
    }),
    failed: (): AppError => ({
      code: 'PAY-401',
      message: 'Payment authentication failed',
      userMessage: 'Payment failed. Please try again.',
    }),
  },

  // Database errors
  database: {
    connection: (): AppError => ({
      code: 'DB-CONNECTION',
      message: 'Cannot connect to database',
      userMessage: 'Unable to connect to the server. Please check your internet connection.',
    }),
    queryFailed: (details?: string): AppError => ({
      code: 'DB-QUERY',
      message: `Database query failed: ${details || 'unknown'}`,
      userMessage: 'Something went wrong. Please try again.',
      details: { query: details },
    }),
  },

  // Network errors
  network: {
    offline: (): AppError => ({
      code: 'NET-OFFLINE',
      message: 'User is offline',
      userMessage: 'You appear to be offline. Please check your internet connection.',
    }),
    timeout: (): AppError => ({
      code: 'NET-TIMEOUT',
      message: 'Request timed out',
      userMessage: 'Request timed out. Please try again.',
    }),
    serverError: (status?: number): AppError => ({
      code: 'NET-SERVER',
      message: `Server error: ${status || 'unknown'}`,
      userMessage: 'Server error. Our team has been notified. Please try again later.',
      details: { status },
    }),
  },

  // Validation errors
  validation: {
    required: (field: string): AppError => ({
      code: 'VAL-REQUIRED',
      message: `${field} is required`,
      userMessage: `${field} is required.`,
    }),
    format: (field: string, expected?: string): AppError => ({
      code: 'VAL-FORMAT',
      message: `Invalid format for ${field}`,
      userMessage: `Invalid ${field} format.${expected ? ` Expected: ${expected}` : ''}`,
    }),
    range: (field: string, min?: number, max?: number): AppError => ({
      code: 'VAL-RANGE',
      message: `${field} is out of range`,
      userMessage: `${field} must be between ${min ?? '?'} and ${max ?? '?'}.`,
    }),
  },
};

/**
 * Display error to user (with toast notification)
 *
 * Usage:
 * ```tsx
 * import { useToast } from '@/hooks/use-toast';
 * import { displayError } from '@/lib/errors';
 *
 * const { toast } = useToast();
 * displayError(error, toast);
 * ```
 */
export function displayError(
  error: unknown,
  toast: { error: (title: string, description?: string) => void }
) {
  const appError = createAppError(error);
  toast.error(
    appError.userMessage,
    formatErrorMessage(appError.message, appError.code)
  );
}

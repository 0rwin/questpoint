/**
 * Manual Discount System
 *
 * Spec Section 7.5 - Promotional Discounts
 * - Staff-only manual discounts (no customer-facing promo codes)
 * - Applied to specific orders
 * - Use cases: complaint resolution, VIP customers, employee discounts
 */

export type DiscountType = 'percentage' | 'fixed_amount';
export type DiscountReason =
  | 'complaint_resolution'
  | 'vip_customer'
  | 'employee_discount'
  | 'manager_override'
  | 'other';

export interface ManualDiscount {
  id: string;
  orderId: string;
  type: DiscountType;
  value: number; // Percentage (0-100) or fixed amount in dollars
  reason: DiscountReason;
  notes?: string;
  appliedBy: string; // Staff member who applied it
  appliedAt: string; // ISO timestamp
}

export interface DiscountCalculation {
  originalTotal: number;
  discountAmount: number;
  finalTotal: number;
  discount: ManualDiscount;
}

/**
 * Calculate discount amount based on type and value
 */
export function calculateDiscount(
  orderTotal: number,
  type: DiscountType,
  value: number
): number {
  if (type === 'percentage') {
    // Percentage discount (0-100)
    const percentage = Math.min(100, Math.max(0, value));
    return (orderTotal * percentage) / 100;
  } else {
    // Fixed amount discount
    return Math.min(orderTotal, Math.max(0, value));
  }
}

/**
 * Apply manual discount to an order
 */
export function applyManualDiscount(
  orderId: string,
  orderTotal: number,
  type: DiscountType,
  value: number,
  reason: DiscountReason,
  staffMemberId: string,
  notes?: string
): DiscountCalculation {
  const discountAmount = calculateDiscount(orderTotal, type, value);
  const finalTotal = Math.max(0, orderTotal - discountAmount);

  const discount: ManualDiscount = {
    id: `discount_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    orderId,
    type,
    value,
    reason,
    notes,
    appliedBy: staffMemberId,
    appliedAt: new Date().toISOString(),
  };

  // Save discount to database (stub)
  console.log('[STUB] Saving manual discount to database:', discount);

  return {
    originalTotal: orderTotal,
    discountAmount,
    finalTotal,
    discount,
  };
}

/**
 * Get discount label for display
 */
export function getDiscountLabel(discount: ManualDiscount): string {
  if (discount.type === 'percentage') {
    return `${discount.value}% off`;
  } else {
    return `$${discount.value.toFixed(2)} off`;
  }
}

/**
 * Get discount reason label
 */
export function getDiscountReasonLabel(reason: DiscountReason): string {
  const labels: Record<DiscountReason, string> = {
    complaint_resolution: 'Complaint Resolution',
    vip_customer: 'VIP Customer',
    employee_discount: 'Employee Discount',
    manager_override: 'Manager Override',
    other: 'Other',
  };

  return labels[reason] || 'Unknown';
}

/**
 * Validate discount application
 */
export function validateDiscount(
  type: DiscountType,
  value: number,
  orderTotal: number
): { valid: boolean; error?: string } {
  if (type === 'percentage') {
    if (value < 0 || value > 100) {
      return {
        valid: false,
        error: 'Percentage discount must be between 0 and 100',
      };
    }
  } else {
    if (value < 0) {
      return {
        valid: false,
        error: 'Discount amount cannot be negative',
      };
    }

    if (value > orderTotal) {
      return {
        valid: false,
        error: 'Discount amount cannot exceed order total',
      };
    }
  }

  return { valid: true };
}

/**
 * Get all discounts for an order
 * @stub This will query Supabase when integrated
 */
export async function getOrderDiscounts(orderId: string): Promise<ManualDiscount[]> {
  console.log('[STUB] Fetching discounts for order:', orderId);

  // TODO: Query Supabase
  // const { data, error } = await supabase
  //   .from('order_discounts')
  //   .select('*')
  //   .eq('order_id', orderId);

  return [];
}

/**
 * Remove discount from an order
 * @stub This will update Supabase when integrated
 */
export async function removeDiscount(discountId: string): Promise<{ success: boolean }> {
  console.log('[STUB] Removing discount:', discountId);

  // TODO: Delete from Supabase
  // const { error } = await supabase
  //   .from('order_discounts')
  //   .delete()
  //   .eq('id', discountId);

  return { success: true };
}

/**
 * Preset discount configurations
 * Staff can select from common discount scenarios
 */
export const PRESET_DISCOUNTS = [
  {
    label: 'Complaint Resolution - 25% Off',
    type: 'percentage' as DiscountType,
    value: 25,
    reason: 'complaint_resolution' as DiscountReason,
  },
  {
    label: 'Complaint Resolution - 50% Off',
    type: 'percentage' as DiscountType,
    value: 50,
    reason: 'complaint_resolution' as DiscountReason,
  },
  {
    label: 'Complaint Resolution - Free ($0)',
    type: 'percentage' as DiscountType,
    value: 100,
    reason: 'complaint_resolution' as DiscountReason,
  },
  {
    label: 'VIP Customer - 15% Off',
    type: 'percentage' as DiscountType,
    value: 15,
    reason: 'vip_customer' as DiscountReason,
  },
  {
    label: 'Employee Discount - 50% Off',
    type: 'percentage' as DiscountType,
    value: 50,
    reason: 'employee_discount' as DiscountReason,
  },
  {
    label: 'Custom Amount',
    type: 'fixed_amount' as DiscountType,
    value: 0,
    reason: 'manager_override' as DiscountReason,
  },
];

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/orders
 *
 * Creates a new order after successful payment.
 * Payment-first approach: Only called after Square payment succeeds.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const {
      userId,
      items,
      orderType,
      subtotal,
      tax,
      total,
      paymentIntentId,
      estimatedReadyMinutes,
    } = body;

    if (
      !userId ||
      !items ||
      items.length === 0 ||
      !orderType ||
      subtotal === undefined ||
      tax === undefined ||
      total === undefined ||
      !paymentIntentId
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique order number
    const orderNumber = generateOrderNumber();

    // Calculate estimated ready time
    const now = new Date();
    const readyTime = new Date(now.getTime() + estimatedReadyMinutes * 60000);

    // Create order object (stub - would save to Supabase)
    const order = {
      id: `order_${Date.now()}`,
      orderNumber,
      userId,
      items,
      orderType,
      tableNumber: body.tableNumber || null,
      subtotal,
      tax,
      tipAmount: body.tipAmount || 0,
      pointsUsed: body.pointsUsed || 0,
      total,
      paymentIntentId,
      status: 'pending',
      estimatedReadyAt: readyTime.toISOString(),
      createdAt: now.toISOString(),
    };

    console.log('[STUB] Order created:', order);

    // In real implementation:
    // 1. Save to Supabase orders table
    // 2. Deduct points from user if pointsUsed > 0
    // 3. Award new points (Math.floor(subtotal))
    // 4. Send confirmation email/SMS/push
    // 5. Notify staff via POS integration

    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

/**
 * Generate unique order number
 * Format: QP-YYYYMMDD-NNN
 * Example: QP-20260107-001
 */
function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  // In production, get sequence number from database
  // For stub, use timestamp-based sequence
  const sequence = String(now.getMilliseconds()).padStart(3, '0');

  return `QP-${year}${month}${day}-${sequence}`;
}

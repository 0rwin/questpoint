'use client';

import { Clock, Calendar } from 'lucide-react';
import { Card } from '@/components/ui';
import { isCafeOpen } from '@/lib/utils';

/**
 * After-Hours Notice Component
 *
 * Shows when cafe is closed and allows ordering for next opening time.
 * Per spec: Only allow "next opening time" scheduling, no custom date/time picker.
 */
export function AfterHoursNotice() {
  const { isOpen, nextChange } = isCafeOpen();

  if (isOpen) return null;

  return (
    <Card className="bg-quest-purple/10 border-quest-purple/30 mb-6">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-quest-purple/20 flex items-center justify-center flex-shrink-0">
          <Clock className="text-quest-purple" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-fantasy text-lg text-quest-cream mb-2">
            We're Currently Closed
          </h3>
          <p className="text-sm text-quest-cream/70 mb-3">
            {nextChange}. Your order will be prepared when we open.
          </p>
          <div className="flex items-center gap-2 text-sm text-quest-purple">
            <Calendar size={16} />
            <span>Scheduled for next opening</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

function Progress({
  className,
  value,
  color,
  showRightBorder = false,
  roundedEdge = false,

  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { showRightBorder?: boolean; roundedEdge?: boolean }) {
  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className={cn(
          'h-full w-full flex-1 transition-all',
          showRightBorder && 'border-r-2 border-white',
          roundedEdge && 'rounded-r-full',
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: color,
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

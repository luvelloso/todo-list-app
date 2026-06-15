import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'brand'
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-2xl px-6 py-3 text-sm font-semibold transition-opacity active:opacity-70 disabled:opacity-40',
        variant === 'primary' && 'bg-neutral-900 text-white hover:bg-neutral-800',
        variant === 'ghost' && 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        variant === 'brand' &&
          'bg-[#6C8F1C] text-white hover:bg-[#54770f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ECF5B]',
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
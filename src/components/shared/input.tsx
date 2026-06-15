import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-xl border border-neutral-200 bg-white px-4 py-3',
        'text-sm text-neutral-900 placeholder:text-neutral-400',
        'focus:outline-none focus:ring-2 focus:ring-neutral-300',
        'transition-shadow',
        className,
      )}
      {...props}
    />
  ),
)

Input.displayName = 'Input'
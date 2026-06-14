interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 select-none">
      <button
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center
          rounded border transition-colors
          ${checked
            ? 'border-[#6C8F1C] bg-[#6C8F1C]'
            : 'border-[#D9E3BD] bg-white hover:border-[#E5F0D3]'
          }
        `}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 3.5L3.8 6.5L9 1"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      {label && (
        <span
          className={`text-sm leading-snug ${
            checked ? 'text-[#94A86A] line-through' : 'text-[#23320F]'
          }`}
        >
          {label}
        </span>
      )}
    </label>
  )
}
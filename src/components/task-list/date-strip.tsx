import { useRef, useEffect } from 'react'
import { cn } from '../../lib/utils'
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface DateStripProps {
  selectedDate: string
  onSelect: (date: string) => void
}

function toISODate(d: Date): string {
  return d.toISOString().split('T')[0]
}

function buildWeek(anchor: Date): Date[] {
  // 7 days starting from anchor - 3
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(anchor)
    d.setDate(anchor.getDate() - 3 + i)
    return d
  })
}

export function DateStrip({ selectedDate, onSelect }: DateStripProps) {
  const today = new Date()
  const week  = buildWeek(today)
  const ref   = useRef<HTMLDivElement>(null)

  // Scroll selected date into view on mount
  useEffect(() => {
    const el = ref.current?.querySelector('[data-selected="true"]')
    el?.scrollIntoView({ block: 'nearest', inline: 'center' })
  }, [])

  return (
    <div
      ref={ref}
      className="flex gap-1 overflow-x-auto pb-1 scrollbar-none"
      style={{ scrollbarWidth: 'none' }}
    >
      {week.map((date) => {
        const iso      = toISODate(date)
        const isActive = iso === selectedDate
        const dayName  = DAYS[date.getDay()].toUpperCase()
        const dayNum   = date.getDate()

        return (
          <button
            key={iso}
            data-selected={isActive}
            onClick={() => onSelect(iso)}
            className={cn(
              'flex min-w-[52px] flex-col items-center rounded-2xl px-3 py-2.5 transition-colors',
                      isActive
                      ? 'bg-[#6C8F1C] text-white'
                      : 'text-[#4A5F39] hover:bg-[#E5F0D3]',
            )}
          >
            <span className="text-[10px] font-semibold tracking-widest">
              {dayName}
            </span>
            <span className={cn('mt-0.5 text-base font-semibold', isActive && 'text-white')}>
              {dayNum}
            </span>
          </button>
        )
      })}
    </div>
  )
}
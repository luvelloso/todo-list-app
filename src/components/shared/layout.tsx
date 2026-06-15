import type { ReactNode } from 'react'

interface PageLayoutProps {
  variant?: 'single' | 'split'
  left?: ReactNode
  children: ReactNode
}

export function PageLayout({ variant = 'single', left, children }: PageLayoutProps) {
  return (
    <div className="h-screen box-border bg-[#F6F7F1] px-4 py-4 text-[#202A16]">
      <div
        className={`mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(32,42,22,0.12)] ${
          variant === 'split' ? 'md:flex-row' : ''
        }`}
      >
        {variant === 'split' ? left : null}

        <div
          className={
            variant === 'split'
              ? 'flex-1 min-h-0 flex flex-col justify-between overflow-hidden p-4 sm:p-5'
              : 'min-h-0 flex-1 flex flex-col overflow-hidden p-5'
          }
        >
          {children}
        </div>
      </div>
    </div>
  )
}

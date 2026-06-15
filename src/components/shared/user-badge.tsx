import type { User } from '../../services/api'

interface UserBadgeProps {
  user: User
  onLogout: () => void
}

export function UserBadge({ user, onLogout }: UserBadgeProps) {
  const displayName = user.full_name || user.email || 'User'
  const initials = displayName.charAt(0).toUpperCase()

  return (
    <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#5A6B49] ring-1 ring-[#E2E6CC] shadow-sm">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E5F0C4] text-[11px] font-semibold text-[#4A5B36]">
        {initials}
      </div>
      <span className="hidden sm:inline">{displayName}</span>
      <button
        type="button"
        onClick={onLogout}
        className="rounded-full bg-[#F3F5EA] px-2 py-1 text-[11px] font-semibold text-[#5A6B49] transition hover:bg-[#E5F0D3]"
      >
        Logout
      </button>
    </div>
  )
}

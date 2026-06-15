import { useState, useEffect } from 'react'
import { LoginPage } from './pages/login'
import { TaskListPage } from './pages/tasklist-page'
import { getCurrentUser, type User } from './services/api'

export function AppRouter() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const me = await getCurrentUser()
        setUser(me)
      } catch {
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  function handleAuthenticate(user: User) {
    setUser(user)
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  const page = loading
    ? null
    : user
      ? <TaskListPage user={user} onLogout={handleLogout} />
      : <LoginPage onAuthenticate={handleAuthenticate} />

  return (
    <div className="min-h-screen bg-[#F6F7F1]">
      {page}
    </div>
  )
}

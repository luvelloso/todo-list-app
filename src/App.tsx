import { useState } from 'react'
import { LoginPage } from './pages/login'
import { TaskListPage } from './pages/tasklist-page'

export function AppRouter() {
  const [authenticated, setAuthenticated] = useState(false)

  function handleAuthenticate() {
    setAuthenticated(true)
  }

  const page = !authenticated
    ? <LoginPage onAuthenticate={handleAuthenticate} />
    : <TaskListPage />

  return (
    <div className="min-h-screen bg-[#F6F7F1]">
      {page}
    </div>
  )
}

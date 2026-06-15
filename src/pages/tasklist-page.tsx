import { useState, useEffect } from 'react'
import { PageLayout } from '../components/shared/layout'
import { UserBadge } from '../components/shared/user-badge'
import { DateStrip } from '../components/task-list/date-strip'
import { TaskSection } from '../components/task-list/task-section'
import { AddTaskBar } from '../components/task-list/add-task-bar'
import { useTasks } from '../hooks/use-tasks'
import { CATEGORIES } from '../lib/constants'
import type { CategoryId, Task } from '../types/task'
import type { User } from '../services/api'

function toISODate(d: Date): string {
  return d.toISOString().split('T')[0]
}

interface TaskListPageProps {
  initialTasks?: Task[]
  user?: User
  onLogout?: () => void
}

export function TaskListPage({ initialTasks, user, onLogout }: TaskListPageProps) {
  const today                       = toISODate(new Date())
  const [selectedDate, setDate]     = useState(today)
  const { tasks, addTask, toggleTask, deleteTask, loadTasksForDate } = useTasks(initialTasks)

  useEffect(() => {
    loadTasksForDate(selectedDate)
  }, [selectedDate, loadTasksForDate])

  const dayTasks = tasks.filter((t) => (t.scheduledDate ?? t.createdAt) === selectedDate)

  const completedCount = dayTasks.filter((task) => task.completed).length
  const totalCount = dayTasks.length
  const isToday  = selectedDate === today
  const dateLabel = isToday
    ? 'Today'
    : new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', {
        weekday: 'long',
        month:   'short',
        day:     'numeric',
      })

  async function handleAdd(text: string, categoryId: CategoryId, description?: string) {
    await addTask(text, categoryId, selectedDate, description)
  }

  return (
    <PageLayout variant="single">
      {/* Header */}
      <header className="px-0 pt-4 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-[#23320F]">
              {dateLabel}
            </h1>
            <span className="rounded-full bg-[#F3F5EA] px-3 py-1 text-sm font-semibold text-[#5A6B49]">
              {completedCount}/{totalCount || 1} done
            </span>
          </div>

          {user && onLogout && <UserBadge user={user} onLogout={onLogout} />}
        </div>

        {totalCount > 0 && (
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#E5F0D3]">
            <div
              className="h-full rounded-full bg-[#6C8F1C] transition-all duration-300"
              style={{ width: `${Math.round((completedCount / totalCount) * 100)}%` }}
            />
          </div>
        )}

        <div className="mt-4">
          <DateStrip selectedDate={selectedDate} onSelect={setDate} />
        </div>
      </header>

      {/* Task list */}
      <main className="flex-1 min-h-0 overflow-y-auto px-0 pb-4">
        {dayTasks.length === 0 ? (
          <p className="mt-12 text-center text-sm text-[#5A6B49]">
            Add a task.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {CATEGORIES.map((cat) => (
              <TaskSection
                key={cat.id}
                category={cat}
                tasks={dayTasks.filter((t) => t.categoryId === cat.id)}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </main>

      <div className="mt-4">
        <AddTaskBar onAdd={handleAdd} />
      </div>
    </PageLayout>
  )
}
